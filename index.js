const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
// io sends for inputOutput , It is our main server
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// on event connection  
io.on('connection', (socket) => {
  console.log('a user connected',socket.id);
  // if there is event named user-message do this
  socket.on("user-message",(message)=>{
    console.log("user message is",message);
    // this will send data back from server
    io.emit("message",message+" by "+" "+socket.id) ;
  })
  
});
server.listen(3000, () => {
  console.log('listening on *:3000');
});