// routes/schedule.js

const express = require('express');
const router = express.Router();
const cron = require('node-cron');
const axios = require('axios');
var mongoose = require('mongoose'); 

const db = mongoose.connection;
// Example function to be scheduled
const scheduledTask = async (id) => {
  try {
    // Example: Fetch user from database by ID
    const user = await db.collection('users').findOne({_id: new mongoose.Types.ObjectId(id)});
    // Example: Process user
    // Check condition (e.g., total_money_deducted >= goal)
    if (user.saved_amount >= user.amount) {
      console.log(`${user.name} has reached their savings goal for ${user.goal}.`);
    } else {
      // Deduct money based on user's cycle_amount
      
      const x = user.saved_amount+user.cycle_amount;
   
      saved_amount = x;
      const response = await axios.put(
        `http://localhost:3000/dashboard/user/schedule/${id}`, {saved_amount},
        {
            headers: {
              'Content-Type': 'application/json', 
            },
        }
      );

      console.log(`Added ${user.cycle_amount} to ${user.name}'s total money.`);
    }
  } catch (error) {
    console.error('Error in scheduled task:', error);
  }
};

// Route to start scheduling process with user ID
router.post('/start/:userid', (req, res) => {
  try {
    const { userid} = req.params;
    const cycle = req.body;

    // Scheduling the task to run at at this time
    if(cycle=="daily"){
    cron.schedule('02 06 * * *', () => {
        scheduledTask(userid);
    });}
    else if(cycle =="monthly"){
      cron.schedule('01 06 16 * *', () => {
        scheduledTask(userid);
    });
  }
    else if(cycle =="weekly"){
      cron.schedule('00 06 * * 2', () => {
        scheduledTask(userid);
    });
    }

    res.status(200).json({ message: 'Scheduling started successfully' });
  } catch (error) {
    console.error('Error starting scheduling:', error);
    res.status(500).json({ error: 'Failed to start scheduling' });
  }
});

module.exports = router;
