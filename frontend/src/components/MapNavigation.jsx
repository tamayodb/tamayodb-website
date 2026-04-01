import { useState, useEffect } from "react";
import { X, MapPin, Home, Briefcase, Rocket, Zap, Trophy, Award, Mail } from "lucide-react";
import "../styles/MapNavigation.css";

const locations = [
  {
    id: "hero",
    label: "Home",
    icon: Home,
    description: "Start here",
    position: { top: "50%", left: "50%" },
    color: "#667eea",
  },
  {
    id: "experience",
    label: "Experience",
    icon: Briefcase,
    description: "Work history",
    position: { top: "30%", left: "25%" },
    color: "#7c3aed",
  },
  {
    id: "projects",
    label: "Projects",
    icon: Rocket,
    description: "My work",
    position: { top: "30%", left: "75%" },
    color: "#f59e0b",
  },
  {
    id: "skills",
    label: "Skills",
    icon: Zap,
    description: "Technologies",
    position: { top: "50%", left: "20%" },
    color: "#10b981",
  },
  {
    id: "achievements",
    label: "Achievements",
    icon: Trophy,
    description: "Awards",
    position: { top: "70%", left: "30%" },
    color: "#ef4444",
  },
  {
    id: "certifications",
    label: "Certifications",
    icon: Award,
    description: "Certificates",
    position: { top: "70%", left: "70%" },
    color: "#8b5cf6",
  },
  {
    id: "footer",
    label: "Contact",
    icon: Mail,
    description: "Get in touch",
    position: { top: "85%", left: "50%" },
    color: "#06b6d4",
  },
];

function MapNavigation({ isOpen, onClose }) {
  const [hoveredPin, setHoveredPin] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleLocationClick = (location) => {
    const element = document.getElementById(location.id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="map-overlay" onClick={onClose}>
      <div className="map-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="map-header">
          <div className="map-title-wrapper">
            <MapPin className="map-title-icon" size={28} />
            <h2 className="map-title">Portfolio Map</h2>
          </div>
          <button className="map-close" onClick={onClose} aria-label="Close map">
            <X size={24} />
          </button>
        </div>

        {/* Map Area */}
        <div className="map-area">
          {/* Map Background Pattern */}
          <div className="map-background">
            <div className="map-grid" />
            <div className="map-roads">
              <div className="road road-1" />
              <div className="road road-2" />
              <div className="road road-3" />
            </div>
          </div>

          {/* Location Pins */}
          {locations.map((location) => {
            const Icon = location.icon;
            const isHovered = hoveredPin === location.id;

            return (
              <button
                key={location.id}
                className={`map-pin ${isHovered ? "hovered" : ""}`}
                style={{
                  top: location.position.top,
                  left: location.position.left,
                  "--pin-color": location.color,
                }}
                onClick={() => handleLocationClick(location)}
                onMouseEnter={() => setHoveredPin(location.id)}
                onMouseLeave={() => setHoveredPin(null)}
              >
                <div className="pin-marker">
                  <Icon size={20} />
                </div>
                <div className="pin-label">
                  <span className="pin-name">{location.label}</span>
                  <span className="pin-description">{location.description}</span>
                </div>
                <div className="pin-pulse" />
              </button>
            );
          })}

          {/* Connection Lines */}
          <svg className="map-connections" xmlns="http://www.w3.org/2000/svg">
            {locations.slice(0, -1).map((location, index) => {
              const nextLocation = locations[index + 1];
              return (
                <line
                  key={location.id}
                  x1={location.position.left}
                  y1={location.position.top}
                  x2={nextLocation.position.left}
                  y2={nextLocation.position.top}
                  stroke="rgba(102, 126, 234, 0.3)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  className="connection-line"
                />
              );
            })}
          </svg>
        </div>

        {/* Footer */}
        <div className="map-footer">
          <span>Click any pin to navigate</span>
          <span>•</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
}

export default MapNavigation;