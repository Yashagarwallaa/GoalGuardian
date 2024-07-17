var z = require('zod');
const mongoose = require('mongoose');

const userSchema = z.object({
  name: z.string(),
  email: z.string()
    .email({ message: "Invalid email address" }),
  password: z.string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(100, { message: "Password must be less than 100 characters" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" }),
    goal: z.string().nullable().optional(),
    amount: z.number().nullable().optional(),
    cycle: z.string().nullable().optional(),
    cycle_amount: z.number().nullable().optional(),
    duration: z.number().nullable().optional(),
    upi: z.string().nullable().optional(),
    saved_amount:z.number().optional()
});

const mongooseUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  goal:{
    type: String,
     required: false,
  },
  amount:{
    type:Number,
    required: false,
  },
  cycle:{
    type:String,
    required: false,
  },
  cycle_amount:{
    type:Number,
    required: false,
  },
  upi:{
    type:String,
    required : false,
  } ,
  duration:{
    type:Number,
    required:false
  },
  saved_amount:{
    type:Number,
    trequired:false
  }
});

const UserModel = mongoose.model('User', mongooseUserSchema);

module.exports = UserModel;
module.exports = userSchema;