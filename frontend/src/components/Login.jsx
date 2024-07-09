// Login.jsx
import React, { useEffect, useState } from 'react';
import './Login.css';
import axios from 'axios';
export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
        email,
        password
      };
    try {
      const response = await axios.post('http://localhost:3000/login', formData);
      const token = response.data.token;
      localStorage.setItem('token', token); // Store the token in localStorage
     
       axios.defaults.headers.common['Authorization'] =  `Bearer ${token}`;
      alert(response.data.message); // Display success message from backend
      window.location.href = '/dashboard'; // Redirect to the dashboard
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
        <button type="button" className="guest-button">Go for Demo</button>
      </form>
    </div>
  );
}



