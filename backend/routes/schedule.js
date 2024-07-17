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
    const user = await db.collection('users').findOne({_id: new mongoose.Types.ObjectId(id)});
  
    if (user.saved_amount >= user.amount) {
      console.log(`${user.name} has reached their savings goal for ${user.goal}.`);
    } else {

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
    const {cycle} = req.body;
      
    // Scheduling the task to run at at this time
    if(cycle=="daily"){
    cron.schedule('53 07 * * *', () => {
        scheduledTask(userid);
    });}
    else if(cycle =="monthly"){
      cron.schedule('02 09 17 * *', () => {
        scheduledTask(userid);
    });
  }
    else if(cycle =="weekly"){
      cron.schedule('55 07 * * 2', () => {
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
