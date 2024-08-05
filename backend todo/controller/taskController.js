const asyncHandler = require("express-async-handler");
const task = require("../models/taskModel");
const User = require("../models/userModel");
const express = require("express");
const app = express();

//create task
const createTask = asyncHandler(async (req, res) => {
  console.log('User in createTask:', req.user);


  const {
    text,
    category,
    priority,
    dueDate,
    completed,

  } = req.body;

  const Task = await task.create({
    text,
    category,
    priority,
    dueDate,
    completed,
    user: req.user._id,
  });
  
  res.status(201).send(Task);
});

//get task
const getTask = asyncHandler(async (req, res) => {
  const Task = await task.find({ user: req.user.id });
  res.status(200).send(Task);
});

//update task
const updateTask = asyncHandler(async (req, res) => {
  const Task = await task.findById(req.params.id);
  if (!Task) {
    res.status(400);
    throw new Error ("task not found");
  }
  if (!req.user) {
    res.status(401);
    throw new Error("user not found");
  }
  if (Task.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }
  const updateTask = await task.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).send(updateTask);
});


//deletetask
const deleteTask = asyncHandler(async (req, res) => {
  const Task= await task.findById(req.params.id);
  if (!Task) {
    res.status(400);
    throw new Error("task not found");
  }
  //check if such user is there
  if (!req.user) {
    res.status(400);
    throw new Error("user not authorized");
  }
  if (Task.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }

  const deleteTask = await task.deleteOne({ _id: req.params.id });
  res.status(200).send({ id: req.params.id });
});

const getUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Find user in database by ID
  const user = await User.findById(userId).select("-password");

  // Check if user exists
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Respond with user data
  res.status(200).json({
    user,
    message: "User data retrieved successfully",
  });
});
module.exports = {
    createTask,
    getTask,
    updateTask,
    deleteTask,
    getUser,}