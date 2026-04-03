import { useState } from "react";
import { Download } from "lucide-react"; 
import "../styles/Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDownload = (e) => {
    e.preventDefault();
    
    fetch("/resume.pdf")
      .then((res) => {
        if (!res.ok) throw new Error("Resume not found");
        return res.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "CV_Danyssa_Tamayo.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch((err) => {
        console.error("Download failed:", err);
        alert("Could not download resume. Please check the file path.");
      });
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <div className="logo">
          <a href="#hero">
            <img src="/logo-name.png" alt="tamayodb" />
          </a>
        </div>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#certifications">Certifications</a></li>
          <li><a href="#achievements">Achievements</a></li>
          <li><a href="#leadership">Leadership</a></li>
        </ul>

        <div className="resume-container">
     
          <button 
            type="button"
            onClick={handleDownload} 
            className="resume-btn"
          >
            Resume
            <Download className="resume-icon" /> 
          </button>
        </div>

        <div
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>

      </div>
    </nav>
  );
}

export default Navbar;