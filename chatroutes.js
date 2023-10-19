
// server/routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const ChatRoom = require('../models/chatRoom'); // Your chat room model

// Route to create a new chat room
router.post('/create-room', async (req, res) => {
  try {
    const { name } = req.body;
    const chatRoom = new ChatRoom({ name });
    await chatRoom.save();
    res.json(chatRoom);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to get all chat rooms
router.get('/chat-rooms', async (req, res) => {
  try {
    const chatRooms = await ChatRoom.find();
    res.json(chatRooms);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Add more routes for sending and retrieving messages
// ...

module.exports = router;
