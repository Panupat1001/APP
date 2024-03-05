// HOW TO USE พิมพ์ใน terminal node index.js
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

// HOW TO USE พิมพ์ใน terminal node index.js
// io.on('connection', (socket) => {
//   console.log('a user connected');
//   io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//       console.log('message: ' + msg);
//     });
//   });
//   io.on('connection', (socket) => {
//     socket.broadcast.emit('hi');
    
//   });
// });

server.listen(5000, () => {
  console.log('เชื่อมต่อละไอสัสที่ port:5000');
});