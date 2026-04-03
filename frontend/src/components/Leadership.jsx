import React, { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import "../styles/Leadership.css";

const Leadership = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/leadership`);
        const data = await response.json();
        
        if (data.success) {
          setExperiences(data.experiences);
        }
      } catch (error) {
        console.error('Failed to fetch leadership data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, [API_BASE]);

  if (loading) {
    return (
      <section className="leadership-section">
        <h2 className="section-title">Leadership & Community</h2>
        <div className="loading">Loading...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="leadership-section">
        <h2 className="section-title">Leadership & Community</h2>
        <div className="error">Error: {error}</div>
      </section>
    );
  }

  return (
 <section className="leadership-section" id= "leadership">
  <div className="leadership-container">
    <h2 className="leadership-title">Leadership & Community</h2>
    
    <div className="leadership-list">
        {experiences.map((exp, index) => (
        <div key={exp._id || index} className="leadership-item">

            <div className="leadership-header">
            <h3 className="lead-role">{exp.role}</h3>
            <span className="lead-date">{exp.dateRange}</span>
            </div>

            {exp.url ? (
            <a href={exp.url} target="_blank" rel="noopener noreferrer" className="lead-org">
                {exp.organization} <ExternalLink className="lead-arrow" size={16} />
            </a>
            ) : (
            <span className="lead-org">{exp.organization}</span>
            )}

            {exp.responsibilities?.length > 0 && (
            <ul className="lead-responsibilities">
                {exp.responsibilities.map((resp, idx) => (
                <li key={idx} className="lead-responsibility">{resp}</li>
                ))}
            </ul>
            )}
        </div>
        ))}
    </div>
  </div>
</section>
  );
};

export default Leadership;