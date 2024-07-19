import React, { useState ,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logoimage from '../assets/gg_icon.jpg'

export function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); // Check if token exists
  
  useEffect(()=>{
      setIsLoggedIn(!!localStorage.getItem('token'));
  },[localStorage.getItem('token')])

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clearing token from localStorage
    setIsLoggedIn(false); // Updated login state
    navigate('/');
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
            
              {!!localStorage.getItem('token') ? (
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
            {!!localStorage.getItem('token')? (
              <button className="sign-in" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="sign-in">Sign In/Demo</button>
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
