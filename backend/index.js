var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); 
var UserModel = require('../backend/model/User')
var userSchema = require('../backend/model/User')
var jwt = require('jsonwebtoken');
var cors = require('cors');
var z = require('zod');
var bcrypt = require('bcrypt');
require('dotenv').config();
// var {authenticateToken} = require('./middlewares/authdashboard');

//var cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.json()); //simplifies the data in middleware before sending it to database/servor
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ // for url-encoded requests
    extended:true
}))



const uri = process.env.MONG0_URI;
//connecting the database to mongodb atlas
mongoose.connect(uri,
   {useNewUrlParser : true}, 
   {useUnifiedTopology : true}
).then(() => {
    console.log("Connected To Database");
}).catch((err) => {
    console.log("Error in connecting to database", err);
});

var db = mongoose.connection;

app.get('/',function(req,res){
    res.set({  //res.set returns an object
        "Allow-access-Allow-Origin": "*" //something related to cors
    })
    res.status(200).send("Hello from 3000 port")
}).listen(3000);

//acount creation logic
app.post('/signup',async(req,res)=>{
    try{
     //zod validity check
     userSchema.parse(req.body);
    //userSchema.parse(req.body);

    const { name, email, password, goal, amount, cycle,cycle_amount,duration,upi } = req.body;
    // check if user exists
      const userExist = await db.collection('users').findOne({email:email});
      if(userExist){ //checking if email already exists
          // return res.status(422).json(({error : "Email already exists"}));
          console.log('Email Already Exists');
          return res.status(400).send({message:"User alreday exists.Please Login"});
      }
     const hashedPassword = await bcrypt.hash(password, 10);

     db.collection('users').insertOne({
      name,email,password:hashedPassword,goal, amount,cycle,cycle_amount,duration,upi
     },(err,collection)=>{
      if(err){
        throw err;
      }
      console.log("Record inserted succesfully");
     });
     return res.status(200).send({message:"Account Created Successfully.Please Login"}); //goes to login-page
  }catch(error){
    if (error instanceof z.ZodError) {
      // If the error is a Zod validation error, respond with a 400 status and the error details
      const validationErrors = error.errors.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      }));
      res.status(400).json({ message: 'Validation failed', errors: validationErrors});
    } else {
      // If the error is not a Zod error, respond with a 400 status and the error details
      res.status(400).json({ message: 'Error creating user', error });
  }
}})


//login logic

app.post('/login',async(req,res)=>{

  try{

    const { email, password } = req.body;
    console.log(email);
    const userExist = await db.collection('users').findOne({email:email});
      if(!userExist){ 
          return res.status(400).send({message:"Invalid username or passeord",error});
      }
      console.log(userExist);
      const isPasswordValid = await bcrypt.compare(password, userExist.password);
      console.log(isPasswordValid);
      if (!isPasswordValid) {
        return res.status(400).send({ message: 'Invalid email or password' ,error});
      }
    

      const token = jwt.sign({ _id: userExist._id , name:userExist.name }, process.env.JWT_SECRET, {expiresIn:'20s'});
      console.log(token);
      res.json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).send({ message: 'Error logging in', error });
    }
  });

  //dashboard user get
app.get('/dashboard/user/:id',async(req,res)=>{
   // Add this line for debugging
  try{
    const id = req.params.id;
    console.log(id);
    const data = await db.collection('users').findOne({ _id: new mongoose.Types.ObjectId(id)});
    console.log(data);
    return res.status(200).json({message:"User details sent successfully",data})
  }catch(err){
     console.log(err);
  }
})
  