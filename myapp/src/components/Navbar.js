// src/components/Navbar.js
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import "../css/Navbar.css";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext); // Get the isLoggedIn state and setIsLoggedIn function from AuthContext
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token
    setIsLoggedIn(false); // Update the AuthContext state
    navigate("/login"); // Redirect to login page
  };

  React.useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="code-brackets">&lt;</span>
        CodeX
        <span className="code-brackets">/&gt;</span>
      </div>

      <div
        className={`menu-btn ${isActive ? "active" : ""}`}
        onClick={() => setIsActive(!isActive)}
      >
        <span />
        <span />
        <span />
      </div>

      <ul className={`navbar-links ${isActive ? "active" : ""}`}>
        <li>
          <Link to="/" className="nav-link">
            <i className="fas fa-home" />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/courses" className="nav-link">
            <i className="fas fa-code" />
            <span>Courses</span>
          </Link>
        </li>
        <li>
          <Link to="/playground" className="nav-link">
            <i className="fas fa-laptop-code" />
            <span>Playground</span>
          </Link>
        </li>
        <li>
          <Link to="/chatbot" className="nav-link">
            <i className="fas fa-robot" />
            <span>Nexis AI</span>
          </Link>
        </li>
        {!isLoggedIn ? (
          // Show login and register buttons if not logged in
          <>
            <li className="nav-button">
              <Link to="/login" className="login-btn">
                Log In
              </Link>
            </li>
            <li className="nav-button">
              <Link to="/register" className="register-btn">
                Register
              </Link>
            </li>
          </>
        ) : (
          // Show logout button if logged in
          <li className="nav-button">
            <button onClick={handleLogout} className="logout-btn">
              Log Out
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
