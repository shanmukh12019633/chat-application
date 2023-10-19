
// server/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const Task = require('../models/task'); // Your task model

// Route to create a new task
router.post('/create-task', async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = new Task({ title, description, status });
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to get all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Add more routes for editing and deleting tasks
// ...

module.exports = router;
