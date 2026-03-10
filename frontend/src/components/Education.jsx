import "../styles/Education.css";

const education = [
  {
    id: 1,
    title: "BS Computer Science with specialization in Machine Learning",
    company: "National University - Manila, Philippines",
    logo: "/nu.png",
    period: "August 2022 - August 2026",
    description: "SM Foundation Scholar, Consistent First Honor Dean’s Lister since 2022",
  }
];

function Education() {
  return (
    <section className="education-section" id="education">
      <div className="education-container">
        <h2 className="education-title">Education</h2>
        
        <div className="education-list">
          {education.map((edu) => (
            <div key={edu.id} className="education-card">
              <div className="education-header">
                <div className="education-logo">
                  <img src={edu.logo} alt={edu.company} />
                </div>
                
                <div className="education-info">
                  <h3 className="education-job-title">{edu.title}</h3>
                  <p className="education-company">{edu.company}</p>
                </div>
                
                <div className="education-period">
                  {edu.period}
                </div>
              </div>
              
              <p className="education-description">{edu.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;