import React, { useEffect, useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const demoentry = async()=>{
    const formData = {
      email: 'demo@gg.com',
      password : 'Demo_01'
    };
  try {
    const response = await axios.post('https://goalguardian-backend.onrender.com/login', formData);
    const token = response.data.token;
    localStorage.setItem('token', token); // Storing the token in localStorage
   
     axios.defaults.headers.common['Authorization'] =  `Bearer ${token}`;
     alert(response.data.message + '. Please go to dashboard.'); 

    navigate('/')

    if (/Mobi|Android/i.test(navigator.userAgent)) {
      // Mobile-specific refresh method
      window.location = window.location.href;
    } else {
      window.location.reload();
    }


  } catch (error) {
    alert(error.response.data.message);
  }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
        email,
        password
      };
    try {
      const response = await axios.post('https://goalguardian-backend.onrender.com/login', formData);
      const token = response.data.token;
      localStorage.setItem('token', token); // Storing the token in localStorage
     
       axios.defaults.headers.common['Authorization'] =  `Bearer ${token}`;
       alert(response.data.message + '. Please go to dashboard.'); 

      navigate('/')

      if (/Mobi|Android/i.test(navigator.userAgent)) {
        // Mobile-specific refresh method
        window.location = window.location.href;
      } else {
        window.location.reload();
      }

    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login to Your Account</h1>
      <form onSubmit={handleSubmit} className="login-form">
  
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
        <button type="button" onClick={demoentry} className="guest-button">Go for Demo</button>
      </form>
    </div>
  );
}



