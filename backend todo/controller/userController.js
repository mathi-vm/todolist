//import usermodel
const User = require("../models/userModel");

//import asyncHandler
const asyncHandler=require("express-async-handler");

//import bcryptjs for p.hashig
const bcrypt=require ("bcryptjs");

//import jsonwebtoken
const jwt =require('jsonwebtoken');

require("dotenv").config();

//new user 
const registerUser = asyncHandler(async (req, res) => {
const {name,email,password} = await req.body;

if (!name || !email || !password){
    res.status(400);
    throw new Error("please fill all the fields");
}
//user already exists or not

const userExists = await User.findOne({email:email});
if (userExists){
    res.status(400);
    throw new Error("user already exists");
}
//password hashing

const secret=parseInt(process.env.SALT);

const salt= await bcrypt.genSalt(secret);
const hashedPassword=await bcrypt.hash(password, salt);
const user = await User.create({
    name:name,
    email:email,
    password:hashedPassword
})
if (user){
res.status(201).json({
    _id:user.id,
    name:user.name,
    email:user.email,
    
})
}else {
    res.status(400);
    throw new Error("user already exists");

}
console.log(salt);
});


// /// Generate token function
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.LOGIN_SECRET_KEY, { expiresIn: '30d' });
  };
  
  // Login user function
  const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    // Find user by email
    const user = await User.findOne({ email });
  
    // Log the user object for debugging
    console.log('User found:', user);
  
    // Check if user exists and if the password is correct
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid username or password' });
    }
  });
 module.exports={registerUser, loginUser};
