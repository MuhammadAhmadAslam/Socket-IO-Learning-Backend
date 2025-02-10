const express = require("express")
const http = require("http")



const app = express()
const server = http.createServer(app)

server.listen(9000 , () => {
    console.log("Server Started At Port" + "9000");
    
})