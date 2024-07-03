import React from 'react';
import './Home.css';
import './Features.css';
import { Link } from 'react-router-dom';
export function Home() {

  return (
    <>
    <header className="header">
      <h1 className="title">
        rewards for achieving<br />
        your most important<br />
        goals.
      </h1>
     
   <button><Link to = '/signup' className="get-started-btn">Get Started</Link></button>
   </header>
      <div className="features">
      <h2 className="features-title">What we offer.</h2>
      <div className="features-grid">
        <div className="feature-card">
          <h3>Calculator</h3>
          <p>To give you a precise data regarding your savings/investment.</p>
        </div>
        <div className="feature-card">
          <h3>Tracker</h3>
          <p>Goal tracking helps you to analyse your developments.</p>
        </div>
        <div className="feature-card">
          <h3>Rewards</h3>
          <p>Get your dream goal at a discounted rate than market value.</p>
        </div>
        <div className="feature-card">
          <h3>First Goal?</h3>
          <p>We will cover 10% upto Rs 5000 on your goal. <a href="#" className="create-account">Create your account.</a></p>
        </div>
      </div>
    </div>
</>
  );
}