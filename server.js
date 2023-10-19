// server/server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// MongoDB connection setup
mongoose.connect('mongodb://localhost/chatApp', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const chatRoutes = require('./routes/chatRoutes');
const taskRoutes = require('./routes/taskRoutes');
app.use('/chat', chatRoutes);
app.use('/task', taskRoutes);

// Socket.io configuration for real-time chat and tasks

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
