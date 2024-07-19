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
          <h3>calculator</h3>
          <p>To give you a precise data regarding your savings/investment.</p>
        </div>
        <div className="feature-card">
          <h3>tracker</h3>
          <p>Goal tracking helps you to analyse your developments.</p>
        </div>
        <div className="feature-card">
          <h3>rewards</h3>
          <p>Unlock huge rewards after completing 50% of your goal with us</p>
        </div>
        <div className="feature-card">
          <h3>short term goals</h3>
          <p>We will cover upto 5% of your total amount <a href="#" className="create-account">Create your account.</a></p>
        </div>
      </div>
    </div>
</>
  );
}