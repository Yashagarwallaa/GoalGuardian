import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import './Dashboard.css';
import RazorpayButton from './RazorpayButton';
import LineChart from './LineChart';
const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [user, setUser] = useState("");
  const [userid, setID] = useState("");
  const [goal, setGoal] = useState("");
  const [amount, setAmount] = useState(0);
  const [cycle, setCycle] = useState("");
  const [cycle_amount, setCycleAmount] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [tracker,setTracker] = useState(false);
  const [startGoalbutton,setGoalButton] = useState(true);
  const [rewards,setRewards] = useState(0);
  const [saved_amount,setSavedAmount] = useState(0);
  const [errors, setErrors] = useState({});

  const getUserFromToken = () => {
    const token = localStorage.getItem('token');
    return jwtDecode(token);
  };

  const fetchUserDetails = async (userid) => {
    const response = await axios.get(`https://goalguardian-backend.onrender.com/dashboard/user/${userid}`);
    return response.data;
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
 
    const userData = getUserFromToken();
    if (userData) {
      setUser(userData.name);
      setID(userData._id);
      fetchUserDetails(userData._id).then((data) => {
        if (data.data.goal === "na") {
          setFormVisible(true);
        } else {
          setGoal(data.data.goal);
          setAmount(data.data.amount);
          setCycle(data.data.cycle);
          setCycleAmount(data.data.cycle_amount);
          setDuration(data.data.duration);
          setSavedAmount(data.data.saved_amount);
          setRewards(data.data.reward);
        }
        setLoading(false);
        console.log(data.data.upi);
        if(data.data.upi === "ok"){
          setGoalButton(false);
          setTracker(true);
        }
      });
    } else {
      setLoading(false);
    }
  }, [isLoggedIn, navigate]);

  const calculateCycleAmount = (amount, cycle, duration) => {
    switch (cycle) {
      case 'daily':
        return amount / duration;
      case 'weekly':
        return (amount * 7) / duration;
      case 'monthly':
        return (amount * 30) / duration;
      default:
        return 0;
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      goal,
      amount,
      cycle,
      cycle_amount: calculateCycleAmount(amount, cycle, duration),
      duration
    };
    try {
      console.log(formData);
      const response = await axios.put(`https://goalguardian-backend.onrender.com/dashboard/user/${userid}`, formData);
      console.log(response.data.message);
      setErrors({});
      setFormVisible(false);
    } catch (error) {
      if (error.response?.data?.errors) {
        const errorObj = {};
        error.response.data.errors.forEach((err) => {
          errorObj[err.path] = err.message;
          alert(err.message);
        });
        setErrors(errorObj);
        console.log(error);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }
 

    const startGoal = async () => {
      try {
        const start = await axios.put(`https://goalguardian-backend.onrender.com/setupi/${userid}`, {upi:'ok'})
        const response = await axios.post(`https://goalguardian-backend.onrender.com/schedule/start/${userid}`, {cycle});
        console.log(response.data); 
  
        alert('Scheduling started successfully!');
         setTracker(true);
         setGoalButton(false);
         navigate('/');
         window.location.reload();
      } catch (error) {
        console.error('Error starting scheduling:', error);
        alert('Failed to start scheduling. Please try again.');
      }
    };
  
  return (
    <div className="dashboard">
      <h1>Welcome to your dashboard, {user}</h1>
      {formVisible ? (
        <div className="dashboard-form">
          <h2>Set Your Savings Goal</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="goal">Goal:</label>
              <input
                type="text"
                id="goal"
                name="goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="amount">Amount:</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="duration">Duration (days):</label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cycle">Cycle:</label>
              <select
               type="text"
                id="cycle"
                name="cycle"
                value={cycle}
                onChange={(e) => setCycle(e.target.value)}
              >
                <option value="">Select cycle</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div className="form-group">
              <label type="number" name="cycle_amount" value={cycle_amount}>Cycle Amount: {calculateCycleAmount(amount, cycle, duration).toFixed(2)}</label>
            </div>
            <button type="submit" className="submit-btn">Proceed </button>
          </form>
        </div>
      ) : ( <div>
        <h2 className='goal-summary'>Goal Summary</h2>

        <div className="dashboard-info">
          <p ><strong>Goal : </strong> {goal} </p>
          <p><strong>Amount : </strong> Rs {amount}</p>
          <p><strong>Duration : </strong> {duration} days</p>
          <p><strong>Cycle : </strong> {cycle}</p>
          <p><strong>Cycle Amount : </strong> Rs {calculateCycleAmount(amount, cycle, duration).toFixed(2)}</p>
      <div> {startGoalbutton==true ?<button onClick={startGoal} className="edit-btn">Start Goal</button> : 
      <div>
        </div>}</div>
          {/* <form><RazorpayButton/></form> */}
        </div>
        </div>
      )}
      <div>
        {tracker==true ? <div >
              <div className='tracker' > <h2 className='tracker-head'> Tracker</h2>
              <div className='tracker-content'>
                <div className='chart'>
                 <div className='chart-head'>Savings Chart</div> 
                   <LineChart  reward = {rewards} amount = {amount} id = {userid}  cycle_amount = {cycle_amount} cycle = {cycle} /> 
                </div> 
                <div > <div style={{marginBottom:'1rem', fontStyle:'oblique' }}> Current Status and Rewards</div>
                <p style={{marginBottom:'0.3rem'}}><strong >Saved Amount : </strong> Rs {saved_amount}</p>
                <p><strong>Rewards : </strong> Rs {rewards}</p>
                </div>
                </div>
              </div>
        </div>: <div></div>}
      </div>
    </div>



  );
};

export default Dashboard;

