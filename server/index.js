const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const server_port = 3001;
const client_port = 3002;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: `http://localhost:${client_port}`,
    methods: ["GET", "POST"],
  },
});

app.use(cors());

io.on("connection", (socket) => {
    socket.on("joined:room", (data) => {
        socket.join(data.room);
    });

    socket.on("message:sent", (message) => {
        socket.to(message.room).emit("message:received", message);
  });
});

server.listen(server_port, () => {
  console.log(`HTTP server with Socket.IO is listening on port ${server_port}`);
});
