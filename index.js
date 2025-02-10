const express = require("express")
const http = require("http")
const { Server } = require("socket.io");


const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});


io.on("connection", (socket) => {
    console.log("A new front end connected successfully");
    console.log(socket.id, "this is socket");
    socket.on("user-message" , (message) => {
        console.log("A new user message" , message);
    })
})

server.listen(9000, () => {
    console.log("Server Started At Port" + "9000");

})