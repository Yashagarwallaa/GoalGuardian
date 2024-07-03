import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'
const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); // Check if token exists
  
  return (
    <div className='login-container'>
      {isLoggedIn ?(<h1>
        Welcome to dashboard
      </h1>):(window.location.href='/login')}
    </div>
  );
};

export default Dashboard;
