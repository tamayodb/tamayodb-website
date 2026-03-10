import "../styles/Experience.css";

const experiences = [
  {
    id: 1,
    title: "Web and UI/UX Development Intern",
    company: "Department of Science and Technology - Advanced Science and Technology Institute",
    logo: "/asti.png",
    period: "June 2025 - July 2025",
    description: "Developed and presented a comprehensive project methodology that integrated UI/UX design principles, web development processes, and machine learning techniques compliant with ISO standards to support innovative research initiatives within the Research and Development Division.",
  },
  {
    id: 2,
    title: "Social Media and Administrative Assistant",
    company: "Tinker Hut Therapy Center, Isabela",
    logo: "/tinker.png",
    period: "June 2025 - Present",
    description: "Established the center's digital presence from the ground up and engineered custom Google Apps Script solutions to automate financial tracking and scheduling.",
  },
];

function Experience() {
  return (
    <section className="experience-section" id="experience">
      <div className="experience-container">
        <h2 className="experience-title">Experience</h2>
        
        <div className="experience-list">
          {experiences.map((exp) => (
            <div key={exp.id} className="experience-card">
              <div className="experience-header">
                <div className="experience-logo">
                  <img src={exp.logo} alt={exp.company} />
                </div>
                
                <div className="experience-info">
                  <h3 className="experience-job-title">{exp.title}</h3>
                  <p className="experience-company">{exp.company}</p>
                </div>
                
                <div className="experience-period">
                  {exp.period}
                </div>
              </div>
              
              <p className="experience-description">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;