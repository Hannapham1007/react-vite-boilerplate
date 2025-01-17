import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = () => {
  // Load dark mode preference from local storage
  const savedDarkMode = localStorage.getItem("darkMode");
  const [darkMode, setDarkMode] = useState(savedDarkMode === "true" || false);
  // Toggle dark mode and update local storage
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", String(newDarkMode));
  };
  // Apply dark mode class to body on mount and when dark mode changes
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  return (
    <nav className="nav-container">
      <div className="nav">
        <div>
          <NavLink to="/">Expenso</NavLink>
        </div>
        <div>
          <button
            style={{
              background: "none",
              border: "none",
              padding: "0px",
              display: "flex",
              alignItems: "center",
            }}
            onClick={toggleDarkMode}
          >
            {darkMode ? (
              <>
              <FaSun style={{ color: "var(--white)" }} />
              </>
            ) : (
              <>
              <FaMoon
                style={{ color: "var(--text-color)"}}
              />
              </>
            )}
          </button>
        </div>
        <div>
          <NavLink to="/about">About</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
