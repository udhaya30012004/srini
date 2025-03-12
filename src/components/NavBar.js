import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar({ isLoggedIn, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="brand">CRAACC</Link>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/privacy" className="nav-link">Privacy Policy</Link>
      </div>
      <div className="navbar-right">
        {isLoggedIn ? (
          <button onClick={onLogout} className="logout-btn">Logout</button>
        ) : (
          <>
            <Link to="/signup" className="signup-btn">signup</Link>
            <Link to="/signin" className="login-btn">login</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;