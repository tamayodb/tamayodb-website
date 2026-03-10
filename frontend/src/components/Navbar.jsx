import { useState } from "react";
import { Download } from "lucide-react"; // ✅ Import Download icon
import "../styles/Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <div className="logo">
          <a href="/">
            <img src="/logo-name.png" alt="tamayodb" />
          </a>
        </div>

        {/* Navigation */}
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#certifications">Certifications</a></li>
          <li><a href="#leadership">Leadership</a></li>
        </ul>

        <div className="resume-container">
          <a 
            href="/resume.pdf"  
            className="resume-btn"
            download="Danyssa_Tamayo_Resume.pdf"
          >
            Resume
            <Download className="resume-icon" /> 
          </a>
        </div>

        {/* Mobile Toggle */}
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