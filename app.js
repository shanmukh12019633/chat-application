// app.js (for chat functionality)
const socket = io(); // Establish a connection to the Socket.io server

// Function to handle sending chat messages
const sendMessage = () => {
  const messageInput = document.getElementById('message-input');
  const message = messageInput.value;
  socket.emit('chatMessage', message);
  messageInput.value = ''; // Clear the input field
};

// Function to display received chat messages
socket.on('chatMessage', (message) => {
  const chatContainer = document.getElementById('chat-container');
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  chatContainer.appendChild(messageElement);
});

// Attach the sendMessage function to the "Send" button
document.getElementById('send-button').addEventListener('click', sendMessage);
