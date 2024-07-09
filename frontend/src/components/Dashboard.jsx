import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
const Dashboard = () => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); // Check if token exists
  const [user, setUser] = useState("");
  const [userid,setID] = useState("");
  const [goal, setGoal] = useState("");
  const [amount, setAmount] = useState(0);
  const [cycle, setCycle] = useState("");
  const [cycleAmount, setCycleAmount] = useState(0);
  const [duration,setDuration] = useState(0);

  const [loading, setLoading]  = useState(true);
  const [formVisible, setFormVisible] = useState(false);

 const getUserFromToken = () => {
    const token =  localStorage.getItem('token');
      const decoded = jwtDecode(token);
      return decoded;
  };

 const fetchUserDetails = async (userid) => {
  console.log(userid);
    const response = await axios.get(`http://localhost:3000/dashboard/user/${userid}`)
     const data = await response.data;
    return data;
  };
  useEffect(() => {
    const userData =  getUserFromToken();
    console.log(userData);
    if (userData) {
      setUser(userData.name);
      setID(userData._id);
      fetchUserDetails(userid).then((data) => {
        console.log(data.data.goal);

        if (data.data.goal==="na" ) {
          setFormVisible(true);
        } else {
          setGoal(data.goal);
          setAmount(data.amount);
          setCycle(data.cycle);
          setCycleAmount(data.cycleAmount);
          setDuration(data.duration);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [userid, user]);

  const calculateCycleAmount = (amount, cycle, duration) => {
    switch (cycle) {
      case 'daily':
        setCycleAmount(amount / duration);
      case 'weekly':
        setCycleAmount(amount *7/ duration);
      case 'monthly':
        setCycleAmount(amount*30/duration);
      default:
        return 0;
    }
  };
  const handleFormSubmit = async (e)=>{
    e.preventDefault();
    const formData = {
      goal,
      amount,
      cycle,
      cycleAmount,
      duration
    };
    try {
      const response = await axios.post('http://localhost:3000/dashboard', formData);
      alert(response.data.message);
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
 
      }
    }
  };
  return (
    <div className='login-container'>
      {isLoggedIn ? (
        <div>
          <h1>Welcome to your dashboard, {user}</h1>
          <div>
            {formVisible ? (
              <div>
                <form onSubmit={handleFormSubmit}>
                  <div>
                    <label>
                      Goal:
                      <input
                        type="text"
                        name="goal"
                        value={goal}
                        onChange={(e) => {
                          setGoal(e.target.value);
                        }}
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      Amount:
                      <input
                        type="number"
                        name="amount"
                        value={amount}
                        onChange={(e) => {
                          setAmount(e.target.value);
                        }}
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      Duration in days:
                      <input
                        type="number"
                        name="duration"
                        value={duration}
                        onChange={(e) => {
                          setDuration(e.target.value);
                        }}
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      Cycle:
                      <select
                        name="cycle"
                        value={cycle}
                        onChange={(e) => {
                          setCycle(e.target.value);
                        }}
                      >
                        <option value="">Select cycle</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </label>
                  </div>
                  <div>
                    <label>
                      Cycle Amount: {calculateCycleAmount(amount, cycle, duration)}
                    </label>
                  </div>
                  <button type="submit">Save</button>
                </form>
              </div>
            ) : (
              <div>
                <p>Goal: {goal}</p>
                <p>Amount: {amount}</p>
                <p>Duration (in days): {duration}</p>
                <p>Cycle: {cycle}</p>
                <p>Cycle Amount: {calculateCycleAmount(amount, cycle, duration)}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        window.location.href = '/login'
      )}
    </div>
  );
};

export default Dashboard;
