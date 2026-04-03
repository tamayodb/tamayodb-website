import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Award, Calendar, Loader2, ExternalLink } from "lucide-react";
import "../styles/Achievements.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const VISIBLE_COUNT = 3; 

function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/achievements`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();

      if (data.success && Array.isArray(data.achievements)) {
        setAchievements(data.achievements);
        setError(null);
      } else {
        throw new Error("Invalid data structure from API");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load achievements. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const nextAchievements = () => {
    setCurrentIndex((prev) => {
      const nextIndex = prev + VISIBLE_COUNT;
      return nextIndex >= achievements.length ? 0 : nextIndex;
    });
  };

  const prevAchievements = () => {
    setCurrentIndex((prev) => {
      const prevIndex = prev - VISIBLE_COUNT;
      return prevIndex < 0 ? Math.max(0, achievements.length - VISIBLE_COUNT) : prevIndex;
    });
  };

  const visibleAchievements = achievements.slice(currentIndex, currentIndex + VISIBLE_COUNT);

  if (loading) {
    return (
      <section className="achievements-section" id="achievements">
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
            <p>{error || "No achievements to display"}</p>
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