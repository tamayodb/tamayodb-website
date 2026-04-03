import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Award, Calendar, Loader2, ExternalLink } from "lucide-react";
import "../styles/Achievements.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
const VISIBLE_COUNT = 3; 

function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const fetchAchievements = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log(`Fetching from: ${API_BASE}/api/achievements`);
      
      const response = await fetch(`${API_BASE}/api/achievements`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store' 
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText || response.statusText}`);
      }
      
      const data = await response.json();
      console.log("API Response:", data);

      const items = data?.achievements || data?.data || [];
      
      if (Array.isArray(items)) {
        setAchievements(items);
      } else {
        throw new Error("Invalid data structure: expected array");
      }
      
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "Failed to load achievements");
      
      if (err.message.includes('Failed to fetch') && !window._retryAttempted) {
        window._retryAttempted = true;
        console.log("Retrying once...");
        setTimeout(fetchAchievements, 1000);
        return;
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAchievements();
  }, [fetchAchievements]);

  const nextAchievements = () => {
    if (isAnimating || achievements.length <= VISIBLE_COUNT) return;
    
    setIsAnimating(true);
    setCurrentIndex((prev) => {
      const nextIndex = prev + VISIBLE_COUNT;
      return nextIndex >= achievements.length ? 0 : nextIndex;
    });
    setTimeout(() => setIsAnimating(false), 300); 
  };

  const prevAchievements = () => {
    if (isAnimating || achievements.length <= VISIBLE_COUNT) return;
    
    setIsAnimating(true);
    setCurrentIndex((prev) => {
      const prevIndex = prev - VISIBLE_COUNT;
      return prevIndex < 0 ? Math.max(0, achievements.length - VISIBLE_COUNT) : prevIndex;
    });
    setTimeout(() => setIsAnimating(false), 300);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextAchievements();
      if (e.key === 'ArrowLeft') prevAchievements();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [achievements.length, isAnimating]);

  const visibleAchievements = achievements.slice(currentIndex, currentIndex + VISIBLE_COUNT);
  const totalPages = Math.ceil(achievements.length / VISIBLE_COUNT);
  const currentPage = Math.floor(currentIndex / VISIBLE_COUNT) + 1;

  if (loading && achievements.length === 0) {
    return (
      <section className="achievements-section" id="achievements" aria-busy="true">
        <div className="achievements-container">
          <h2 className="achievements-title">Achievements</h2>
          <div className="loading-state">
            <Loader2 className="spinner" size={40} />
            <span>Loading achievements...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error || achievements.length === 0) {
    return (
      <section className="achievements-section" id="achievements">
        <div className="achievements-container">
          <h2 className="achievements-title">Achievements</h2>
          <div className="error-state">
            <p>{error || "No achievements to display yet"}</p>
            <button onClick={fetchAchievements} className="retry-btn">
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="achievements-section" id="achievements">
      <div className="achievements-container">
        <h2 className="achievements-title">Achievements</h2>

        <div className="achievements-carousel">
          <button 
            className="carousel-btn prev" 
            onClick={prevAchievements}
            aria-label="Previous achievements"
            disabled={currentIndex === 0}
          >
            <ChevronLeft size={24} />
          </button>

          <div className="achievements-grid">
            {visibleAchievements.map((achievement, index) => (
              <div key={achievement._id || index} className="achievement-card">
                <div className="achievement-header">
                  <div className="achievement-title-group">
                    <h3 className="achievement-name">
                      {achievement.url ? (
                        <a 
                          href={achievement.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="achievement-link"
                        >
                          {achievement.title}
                          <ExternalLink size={16} className="link-icon" />
                        </a>
                      ) : (
                        achievement.title
                      )}
                    </h3>
                    <div className="achievement-date">
                      <Calendar size={14} />
                      <span>{achievement.date}</span>
                    </div>
                  </div>
                  
                  <div className={`achievement-badge ${achievement.awardType}`}>
                    <Award size={16} />
                    <span>{achievement.award}</span>
                  </div>
                </div>

                <ul className="achievement-description">
                  {achievement.description.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>

                {achievement.url && (
                  <a 
                    href={achievement.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="achievement-view-btn"
                  >
                    View
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            ))}
          </div>

          <button 
            className="carousel-btn next" 
            onClick={nextAchievements}
            aria-label="Next achievements"
            disabled={currentIndex + VISIBLE_COUNT >= achievements.length}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="carousel-dots">
          {Array.from({ length: Math.ceil(achievements.length / VISIBLE_COUNT) }).map((_, index) => (
            <button
              key={index}
              className={`dot ${index === Math.floor(currentIndex / VISIBLE_COUNT) ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index * VISIBLE_COUNT)}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Achievements;