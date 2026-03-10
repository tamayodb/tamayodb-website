import { useState } from "react";
import { Github, ExternalLink, Loader2 } from "lucide-react";
import "../styles/Projects.css";

const projects = [
  {
    id: 1,
    title: "Tropical Cyclone Impact Profiling",
    description: "Developed clustering models including K-Means, DBSCAN, Gaussian Mixture Models, and Agglomerative Clustering to profile disaster severity patterns. Applied Optuna for hyperparameter tuning and used PCA for visualization and interpretability. Integrated MAACLI explainability to generate actionable severity tiers, with data sourced through partnerships with PAGASA and NDRRMC. The research was accepted for presentation at ICICT 2026 in Honolulu, Hawaii.",
    image: "/impact-profiling.png", 
    embedUrl: "https://clustering-for-post-tropical-cyclon.vercel.app/cluster", // Live embed URL
    github: "https://github.com/tamayodb/Clustering-for-Post-Tropical-Cyclone-Impact-Profiling-in-the-Philippines",
    live: "https://clustering-for-post-tropical-cyclon.vercel.app/cluster",
    tech: ["Python", "Scikit-learn", "PCA", "Optuna", "SHAP", "MAACLI"],
    featured: true,
  },
  {
    id: 2,
    title: "Tropical Cyclone Damage Prediction",
    description: "Developed clustering models including K-Means, DBSCAN, Gaussian Mixture Models, and Agglomerative Clustering to profile disaster severity patterns. Applied Optuna for hyperparameter tuning and used PCA for visualization and interpretability. Integrated MAACLI explainability to generate actionable severity tiers, with data sourced through partnerships with PAGASA and NDRRMC. The research was accepted for presentation at ICICT 2026 in Honolulu, Hawaii.",
    image: "/prediction.png",
    embedUrl: "https://clustering-for-post-tropical-cyclon.vercel.app/prediction",
    github: "https://github.com/tamayodb/Clustering-for-Post-Tropical-Cyclone-Impact-Profiling-in-the-Philippines",
    live: "https://clustering-for-post-tropical-cyclon.vercel.app/prediction",
    tech: ["Python", "Machine Learning", "Data Analysis", "XGBoost", "Regression"],
    featured: true,
  },
   {
    id: 3,
    title: "A Machine Learning Approach to Predicting No-Shows in a Philippine Pediatric Therapy Clinic",
    description: "This project aims to develop a binary classification model that predicts whether a patient will attend or miss a scheduled pediatric therapy session. The model utilizes operational clinic data, such as appointment schedules, payment histories, and patient demographics, combined with external variables including local weather events and official Philippine holidays.",
    image: "/noshows.png",
    embedUrl: "",
    github: "https://github.com/tamayodb/CCDATSCL_PROJECT_COM222/blob/deliverables/ML%20No%20Show%20Prediction%20Implementation.ipynb",
    live: "https://github.com/tamayodb/CCDATSCL_PROJECT_COM222/blob/deliverables/ML%20No%20Show%20Prediction%20Implementation.ipynb",
    tech: ["Python", "Machine Learning", "Statistical Analysis", "Modelling"],
    featured: true,
  },
   {
    id: 4,
    title: "FNRI Food Composition Scraper",
    description: "A Python-based web scraper that extracts data from the Philippine Food Composition Table (FCT) provided by the Food and Nutrition Research Institute (FNRI) of the Philippines. This project is useful for researchers, data scientists, and nutritionists who want to analyze the nutrient content of commonly consumed foods in the Philippines.",
    image: "/fnri.png",
    embedUrl: "",
    github: "https://github.com/tamayodb/fnri-food-composition-scraper/blob/main/scrape_v7.py",
    live: "https://github.com/tamayodb/fnri-food-composition-scraper/blob/main/scrape_v7.py",
    tech: ["Selenium", "Pandas", "Automation", "Chrome Web Driver", "Data Extraction"],
    featured: true,
  },
];

function Projects() {
  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">
        <h2 className="projects-title">Projects</h2>
        
        <div className="projects-list">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
            />
          ))}
        </div>
        <button 
          className="show-more-btn"
        >
          Show more
        </button>
      </div>
    </section>
  );
}

// Separate component for each project card
function ProjectCard({ project, index }) {
  const [embedLoaded, setEmbedLoaded] = useState(false);
  const [embedError, setEmbedError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isReversed = index % 2 === 0; // Check if card is reversed

  return (
    <div 
      className={`project-card ${isReversed ? 'reverse' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="project-image-wrapper">
        <div className="project-embed">
          {/* Loading Spinner */}
          {!embedLoaded && !embedError && project.embedUrl && (
            <div className="embed-loading">
              <Loader2 className="spinner" size={40} />
              <span>Loading preview...</span>
            </div>
          )}

          {/* Live Embed */}
          {project.embedUrl && !embedError && (
            <iframe
              src={project.embedUrl.trim()}
              title={project.title}
              className={embedLoaded ? 'visible' : ''}
              onLoad={() => setEmbedLoaded(true)}
              onError={() => {
                setEmbedError(true);
                setEmbedLoaded(false);
              }}
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              loading="lazy"
            />
          )}

          {/* Fallback Image */}
          {(!project.embedUrl || embedError) && (
            <img src={project.image} alt={project.title} />
          )}

          {/* Error Message Overlay */}
          {embedError && (
            <div className="error-message">
              <p>Preview unavailable</p>
              <a 
                href={project.live?.trim()} 
                target="_blank" 
                rel="noopener noreferrer"
                className="view-live-btn"
              >
                <ExternalLink size={16} />
                Open in new tab
              </a>
            </div>
          )}
        </div>

        {/* Overlay Links */}
        <div className={`project-overlay ${isHovered ? 'visible' : ''}`}>
          <div className="project-links">
            <a 
              href={project.github?.trim()} 
              className="project-link" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="View Code"
            >
              <Github size={20} />
            </a>
            <a 
              href={project.live?.trim()} 
              className="project-link" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Live Demo"
            >
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
      </div>
      
      <div className={`project-content ${isReversed ? 'align-right' : ''}`}>
    
        {project.featured && (
          <div className="project-badge">
            <span className="badge-dot"></span>
            <span className="badge-text">complete</span>
          </div>
        )}
        
        <h3 className="project-title-text">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        
        {project.tech && (
          <div className="project-tech">
            {project.tech.map((tech, i) => (
              <span key={i} className="tech-tag">{tech}</span>
            ))}
          </div>
        )}
        
        <div className="project-actions">
          <a 
            href={project.github?.trim()} 
            className="project-btn" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Github size={18} />
            <span>Code</span>
          </a>
          <a 
            href={project.live?.trim()} 
            className="project-btn primary" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <span>Live Demo</span>
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Projects;