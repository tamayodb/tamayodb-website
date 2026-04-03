import { useState, useEffect, useCallback } from "react";
import { ExternalLink, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import "../styles/Certifications.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
const INITIAL_VISIBLE_COUNT = 10; 

function Certifications() {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const fetchCertifications = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log(`Fetching from: ${API_BASE}/api/certifications`);
      
      const response = await fetch(`${API_BASE}/api/certifications`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      
        cache: 'no-store'
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText || response.statusText}`);
      }
      
      const data = await response.json();
      console.log("API Response:", data);

      const items = data?.data || data?.certifications || [];
      
      if (Array.isArray(items)) {
        setCertifications(items);
      } else {
        throw new Error("Invalid data structure: expected array");
      }
      
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "Failed to load certifications");
      
      if (err.message.includes('Failed to fetch') && !window._retryAttempted) {
        window._retryAttempted = true;
        console.log("Retrying once...");
        setTimeout(fetchCertifications, 1000);
        return;
      }
    } finally {
      setLoading(false);
    }
  }, []); 

  useEffect(() => {
    fetchCertifications();
  }, [fetchCertifications]);

  const toggleShowAll = () => {
    setShowAll(prev => !prev);
    if (!showAll) {
    
      setTimeout(() => {
        document.querySelector('.certifications-list')?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest' 
        });
      }, 100);
    }
  };

  const visibleCertifications = showAll 
    ? certifications 
    : certifications.slice(0, INITIAL_VISIBLE_COUNT);

  if (loading && certifications.length === 0) {
    return (
      <section className="certifications-section">
        <div className="certifications-container">
          <h2 className="certifications-title">Certifications</h2>
          <div className="loading-state">
            <Loader2 className="spinner" />
            <p>Loading certifications...</p>
          </div>
        </div>
      </section>
    );
  }


  if (error && certifications.length === 0) {
    return (
      <section className="certifications-section">
        <div className="certifications-container">
          <h2 className="certifications-title">Certifications</h2>
          <div className="error-state">
            <p> {error}</p>
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