import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaPlane, FaEnvelope, FaMoon, FaSun } from "react-icons/fa";

const Header = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 18 || hour < 6) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header>
      <h1>AI Travel Planner</h1>
      <nav>
        <Link to="/">
          <FaHome /> Home
        </Link>
        <Link to="/plan-trip">
          <FaPlane /> Plan Your Trip
        </Link>
        <Link to="/contact">
          <FaEnvelope /> Contact
        </Link>
      </nav>
      <button onClick={toggleTheme} style={{ marginTop: "10px" }}>
        {theme === "light" ? <FaMoon /> : <FaSun />}{" "}
        {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
      </button>
    </header>
  );
};

export default Header;
