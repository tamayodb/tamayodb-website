import { useState, useEffect } from "react";
import { ExternalLink, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import "../styles/Certifications.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const INITIAL_VISIBLE_COUNT = 10; 

function Certifications() {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false); 

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      setLoading(true);
      console.log("Fetching from:", `${API_URL}/api/certifications`);
      
      const response = await fetch(`${API_URL}/api/certifications`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("API Response:", data);

      if (data.success && Array.isArray(data.data)) {
        setCertifications(data.data);
        setError(null);
      } else if (data.success && Array.isArray(data.certifications)) {
        setCertifications(data.certifications);
        setError(null);
      } else {
        throw new Error("Invalid data structure from API");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load certifications. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
    
    document.getElementById('certifications')?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  };

  const visibleCertifications = showAll 
    ? certifications 
    : certifications.slice(0, INITIAL_VISIBLE_COUNT);

  if (loading) {
    return (
      <section className="certifications-section" id="certifications">
        <div className="certifications-container">
          <h2 className="certifications-title">Certifications</h2>
          <div className="loading-state">
            <Loader2 className="spinner" size={40} />
            <span>Loading certifications...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="certifications-section" id="certifications">
        <div className="certifications-container">
          <h2 className="certifications-title">Certifications</h2>
          <div className="error-state">
            <p>{error}</p>
            <button onClick={fetchCertifications} className="retry-btn">
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!Array.isArray(certifications)) {
    console.error("certifications is not an array:", certifications);
    return (
      <section className="certifications-section" id="certifications">
        <div className="certifications-container">
          <h2 className="certifications-title">Certifications</h2>
          <div className="error-state">
            <p>Invalid data format</p>
            <button onClick={fetchCertifications} className="retry-btn">
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="certifications-section" id="certifications">
      <div className="certifications-container">
        <h2 className="certifications-title">Certifications</h2>

        <div className="certifications-list">
          {visibleCertifications.map((cert) => (
            <a
              key={cert._id || cert.id}
              href={cert.url || "#"}
              className={`certification-item ${!cert.url ? 'no-link' : ''}`}
              target={cert.url ? "_blank" : undefined}
              rel={cert.url ? "noopener noreferrer" : undefined}
              onClick={(e) => {
                if (!cert.url) {
                  e.preventDefault();
                }
              }}
            >
              <span className="cert-date">{cert.date}</span>
              <span className="cert-title">
                {cert.title} - {cert.provider}
                {cert.url && <ExternalLink className="cert-arrow" size={16} />}
              </span>
            </a>
          ))}
        </div>

        {certifications.length > INITIAL_VISIBLE_COUNT && (
          <button 
            className="show-more-btn" 
            onClick={toggleShowAll}
            aria-expanded={showAll}
          >
            {showAll ? (
              <>
                Show less
              </>
            ) : (
              <>
                Show more
              </>
            )}
          </button>
        )}

        <div className="certifications-count">
          Showing {visibleCertifications.length} of {certifications.length} certifications
        </div>
      </div>
    </section>
  );
}

export default Certifications;