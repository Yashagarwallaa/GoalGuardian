// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

export function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [goal, setGoal] = useState("na");
  const [amount, setAmount] = useState(0);
  const [cycle, setCycle] = useState("na");
  const [cycle_amount, setCycleAmount] = useState(0);
  const [duration,setDuration] = useState(0);
  const [upi,setupi] = useState("na");

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
        name,
        email,
        password,
        goal,
        amount,
        cycle,
        cycle_amount,
        duration,
        upi
      };
    try {
        const response = await axios.post('https://goalguardian-backend.onrender.com/signup', formData);
        alert(response.data.message);
        setName("");
       setPassword("");
      setEmail("");
      setErrors({});
      } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
          const backendErrors = error.response.data.errors;
          const errorObj = {};
          backendErrors.forEach((err) => {
            errorObj[err.path] = err.message;
            alert(err.message);
          });
          setErrors(errorObj); // Set errors in state
        } else {
          alert(error.response.data.message);
        //   setName("");
        //   setPassword("");
        //  setEmail("");
           // Fallback error message
        }
      }
    // console.log('Account created succesfully', { name, email, password })
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Create Your Account</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
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
        <button type="submit" className="login-button">Signup</button>
      </form>
    </div>
  );
}