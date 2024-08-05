//import express
const express= require ("express");

//import router
const router = express.Router();

//import registeruser loginuser function in controllers
const { registerUser, loginUser} = require("../controller/userController.js");


router.post("/register", registerUser);
router.post("/login", loginUser);



module.exports = router;

