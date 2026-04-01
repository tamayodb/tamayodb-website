import { useState, useEffect, useRef } from "react";
import { X, Search, ChevronRight, Command, Laptop, Moon, Sun } from "lucide-react";
import "../styles/CommandPalette.css";

const sections = [
  { id: "hero", label: "Home", icon: "🏠", shortcut: "G H" },
  { id: "experience", label: "Experience", icon: "💼", shortcut: "G E" },
  { id: "projects", label: "Projects", icon: "🚀", shortcut: "G P" },
  { id: "skills", label: "Skills", icon: "⚡", shortcut: "G S" },
  { id: "achievements", label: "Achievements", icon: "🏆", shortcut: "G A" },
  { id: "certifications", label: "Certifications", icon: "📜", shortcut: "G C" },
  { id: "footer", label: "Contact", icon: "📧", shortcut: "G T" },
];

const actions = [
  { id: "github", label: "View GitHub", icon: "🐙", url: "https://github.com/tamayodb" },
  { id: "linkedin", label: "View LinkedIn", icon: "💼", url: "https://linkedin.com/in/danyssa-tamayo-5970a4280" },
  { id: "email", label: "Send Email", icon: "📧", url: "mailto:tdanyssaaa@gmail.com" },
  { id: "resume", label: "Download Resume", icon: "📄", url: "/resume.pdf" },
];

function CommandPalette({ isOpen, onClose }) {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);

  // Combine sections and actions for search
  const allItems = [
    ...sections.map((s) => ({ ...s, type: "section" })),
    ...actions.map((a) => ({ ...a, type: "action" })),
  ];

  // Filter items based on search
  const filteredItems = allItems.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setSearch("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          handleSelect(filteredItems[selectedIndex]);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  // Handle item selection
  const handleSelect = (item) => {
    if (item.type === "section") {
      // Scroll to section
      const element = document.getElementById(item.id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (item.url) {
      // Open URL
      window.open(item.url, item.id === "email" ? "_self" : "_blank");
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="command-palette-overlay" onClick={onClose}>
      <div className="command-palette" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="command-palette-header">
          <Search className="search-icon" size={20} />
          <input
            ref={inputRef}
            type="text"
            className="command-palette-input"
            placeholder="Type a command or search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Results */}
        <div className="command-palette-results" ref={resultsRef}>
          {filteredItems.length === 0 ? (
            <div className="no-results">
              <Search size={32} />
              <p>No results found</p>
            </div>
          ) : (
            <>
              {/* Sections */}
              {filteredItems.filter((i) => i.type === "section").length > 0 && (
                <div className="results-group">
                  <div className="results-group-label">Navigation</div>
                  {filteredItems
                    .filter((i) => i.type === "section")
                    .map((item, index) => (
                      <button
                        key={item.id}
                        className={`result-item ${
                          selectedIndex === allItems.indexOf(item) ? "selected" : ""
                        }`}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setSelectedIndex(allItems.indexOf(item))}
                      >
                        <span className="item-icon">{item.icon}</span>
                        <span className="item-label">{item.label}</span>
                        <span className="item-shortcut">{item.shortcut}</span>
                        <ChevronRight className="item-arrow" size={16} />
                      </button>
                    ))}
                </div>
              )}

              {/* Actions */}
              {filteredItems.filter((i) => i.type === "action").length > 0 && (
                <div className="results-group">
                  <div className="results-group-label">Actions</div>
                  {filteredItems
                    .filter((i) => i.type === "action")
                    .map((item, index) => (
                      <button
                        key={item.id}
                        className={`result-item ${
                          selectedIndex === allItems.indexOf(item) ? "selected" : ""
                        }`}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setSelectedIndex(allItems.indexOf(item))}
                      >
                        <span className="item-icon">{item.icon}</span>
                        <span className="item-label">{item.label}</span>
                        <ChevronRight className="item-arrow" size={16} />
                      </button>
                    ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="command-palette-footer">
          <span className="footer-key">↑↓</span>
          <span>to navigate</span>
          <span className="footer-key">↵</span>
          <span>to select</span>
          <span className="footer-key">esc</span>
          <span>to close</span>
        </div>
      </div>
    </div>
  );
}

export default CommandPalette;