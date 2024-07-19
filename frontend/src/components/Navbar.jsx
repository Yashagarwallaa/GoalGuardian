import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logoimage from '../assets/gg_icon.jpg'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); // Check if token exists

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from localStorage
    setIsLoggedIn(false); // Update login state
    window.location.reload();
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-left">
            <Link to="/"  onClick={() => setIsOpen(false)}>
              <img  style={{width:'3rem'}} src={logoimage} alt="Logo" className="" />
            </Link>
          </div>
          <div className="navbar-center">
            <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
              <li>
                <Link to="/" onClick={() => setIsOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/calculator" onClick={() => setIsOpen(false)}>
                  Calculator
                </Link>
              </li>
              <li>
            
              {isLoggedIn ? (
              <Link to ="/dashboard">
                Dashboard
              </Link>
            ) : (
             <Link to ="/about">About us</Link>
            )}
               
              </li>
            
              
            </ul>
          </div>
          <div className="navbar-right">
            {isLoggedIn ? (
              <button className="sign-in" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="sign-in">Sign In</button>
              </Link>
            )}
            <button className="menu-toggle" onClick={toggleMenu}>
              ☰
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
