// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import path from "path";
// import connectToDB from "./src/lib/db.js";
// import { app, server } from "./src/lib/socket.js";
// import AuthRouter from "./src/routes/auth.route.js";

// dotenv.config();

// const PORT = process.env.PORT;
// const __dirname = path.resolve();

// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

// app.use("/api/auth", AuthRouter);
// // app.use("/api/messages", messageRoutes);

// // if (process.env.NODE_ENV === "production") {
// //   app.use(express.static(path.join(__dirname, "../frontend/dist")));

// //   app.get("*", (req, res) => {
// //     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
// //   });
// // }

// server.listen(PORT, () => {
//   console.log("server is running on PORT:" + PORT);
//   // connectToDB();
// });




import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

let app = express();

app.use(express.json());
app.use(cors())


let server = http.createServer(app);
let io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
})

let rooms = {}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.on("join_room", (data) => {
    console.log(data, "this is the room id");
    socket.join(data)
    if (!rooms[data]) {
      rooms[data] = [];
    }
    if (!rooms[data].includes(socket.id)) {
      rooms[data].push(socket.id);
    }
    console.log(rooms, "this is the room")
    socket.emit("joined_room", { error: false, message: "Joined room successfully" })
  })


  socket.on("send_message", (data) => {
    console.log(data);
    console.log(rooms);
    if (rooms[data.room]) {
      let filter = rooms[data.room].filter((id) => id === socket.id)
      console.log(filter, "this is the filter");      
      if (filter.length === 0) {
        console.log("you are not in the room");
        socket.emit("error" , { error: true, message: "You are not in the room" })
        return
      }
    }else{
      console.log("No room exsist make a room first ");
      socket.emit("error" , { error: true, message: "No room exsist make a room first " })
      return;
    }

    socket.broadcast.to(data.room).emit("new_message_notification", {
      message: `New message received in room ${data.room}`,
      sender: socket.id,
    });

    io.to(data.room).emit("receive_message", data)
    // socket.to(data.room).emit("receive_message" , data)
    socket.emit("isMessageSent", { ...data, isSended: true })
  })
})



app.get("/", (req, res) => {
  res.send("Hello World!");
});


server.listen(4000, () => {
  console.log("Server is running on port 4000");
});