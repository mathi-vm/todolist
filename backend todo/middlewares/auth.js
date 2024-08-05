const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
require("dotenv").config();
const User = require("../models/userModel");

// Middleware to protect routes
const protect = asyncHandler(async (req, res, next) => {
  //token declaration
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get the token
      token = req.headers.authorization.split(" ")[1];
      console.log(token);
      console.log('User:', req.user);
// Verify the token
      const decoded = jwt.verify(token, process.env.LOGIN_SECRET_KEY);
      console.log(decoded);
  // Find the user by ID 
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      console.log(err); 
      res.status(401);
      throw new Error("not authorized");
    }
  }
});

module.exports = { protect };
