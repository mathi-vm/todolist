//import express
const express = require("express");

//import express router
const router = express.Router();

// import task controllers
const {
  createTask,
  updateTask,
  deleteTask,
  getTask,
  getUser,
  
} = require("../controller/taskController");


const { protect } = require("../middlewares/auth");


router.post("/create", protect, createTask);
router.put("/update/:id", protect, updateTask);
router.delete("/delete/:id", protect, deleteTask);
router.get("/", protect, getTask);
router.get("/getuser", protect, getUser);

module.exports = router;

