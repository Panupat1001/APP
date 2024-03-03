const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

// Store user information
const users = {};

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/chat.html');
});

let temp = "";
let conn_count = 0;

io.on('connection', (socket) => {
   
    console.log('A user connected');
    console.log(`User connected: ${socket.id}`);

    // Listen for chat messages
    socket.on('chatMessage', (message) => {        
        // Broadcast the message to all connected clients
        
        io.emit('chatMessage', { message, socketId: socket.id } ); 
        
        // socket.to(TargetSocketID).emit('chatMessage', { message, socketId: socket.id } ); 
        
    });

    socket.on('typing', () => {
        socket.broadcast.emit('typing', socket.id);
    });

    socket.on('stopTyping', () => {
        socket.broadcast.emit('stopTyping', socket.id);
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
        delete users[socket.id];
        io.emit('userDisconnected', socket.id);
    });
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});