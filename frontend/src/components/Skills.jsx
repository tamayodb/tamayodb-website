import "../styles/Skills.css";

const skillsData = {
  ai_ml: [
    "Python",
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "MAACLI",
    "Optuna",
    "Pandas",
    "NumPy",
    "OpenCV",
    "NLP"
  ],
  backend: [
    "Python",
    "Node.js",
    "PHP",
    "Django",
    "FastAPI",
    "Express",
    "PostgreSQL",
    "MongoDB",
    "REST APIs"
  ],
  frontend: [
    "React",
    "Next.js",
    "JavaScript",
    "Tailwind CSS",
    "Vite",
    "Vue.js",
    "Styled Components"
  ],
  tools: [
    "Google Cloud Platform",
    "Google BigQuery",
    "Cloud Firestore",
    "Firebase",
    "Gemini API",
    "Tableau",
    "R",
    "Selenium",
    "Git",
    "GitHub",
    "Figma",
    "FlutterFlow",
    "Android Studio",
    "Google Apps Script",
    "SAP",
    "Jupyter",
    "Google Colab",
    "VS Code"
  ],
};

function Skills() {
  return (
    <section className="skills-section" id="skills">
      <div className="skills-container">
        <h2 className="skills-title">Skills</h2>

        <div className="skills-content">
          {/* Frontend */}
          <div className="skill-category">
            <h3 className="category-title">Frontend</h3>
            <div className="skill-tags">
              {skillsData.frontend.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Backend */}
          <div className="skill-category">
            <h3 className="category-title">Backend</h3>
            <div className="skill-tags">
              {skillsData.backend.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* AI & Machine Learning */}
          <div className="skill-category">
            <h3 className="category-title">AI & Machine Learning</h3>
            <div className="skill-tags">
              {skillsData.ai_ml.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Developer Tools */}
          <div className="skill-category">
            <h3 className="category-title">Developer Tools</h3>
            <div className="skill-tags">
              {skillsData.tools.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;