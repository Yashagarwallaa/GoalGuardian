import React from 'react'
import './About.css'
function About() {
  return (<div className='about' >
    <h2 className='about-head' >About us</h2>
    <div className='about-des' >
    Introducing GoalGuardian ,<span style={{fontStyle:'italic'}}>  the ultimate savings companion designed to help you achieve short-term financial goals.</span> <br/><br/>
    With GoalGuardian, users are<b style={{color:'rgb(57,255,20)'}}> rewarded upon reaching 50% of their savings target</b>, providing an extra boost of motivation. Our platform offers live tracking of goals through intuitive visuals and real-time data, ensuring users stay informed and on track every step of the way. 
    <br/><br/><br/><br/><a href="signup" style={{color:'rgb(57,200,255)'}} >Join GoalGuardian</a> today and turn your financial aspirations into reality!</div>
    </div>
  )
}

export default About