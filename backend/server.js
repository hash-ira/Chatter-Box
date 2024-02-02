const express = require('express')
const dotenv = require('dotenv')
const { chats } = require('./../data.js')
const app = express();
const connectDB = require('./config/mongoDB.js');
const userRoutes = require("./routes/userRoutes.js");
const chatRoutes = require("./routes/chatRoutes.js");
const messageRoutes = require("./routes/messageRoutes.js");

dotenv.config({path:__dirname+'/../.env'});
connectDB();

app.use(express.json()); //for accepting JSON data

app.get('/' , (req , res) => {
    res.send("<h1> Hello Backend <h1>");
})

app.use("/api/user" , userRoutes);
app.use("/api/chat" , chatRoutes);
app.use("/api/message" , messageRoutes);

const PORT = process.env.PORT || 3000;

const server = app.listen( PORT , () => {
    console.log(`Listening on port ${PORT}`);
})

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
    },
  });

io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
        socket.join(userData?._id);
        socket.emit("connected");
    });

    socket.on("joinChat" , (room) => {
        socket.join(room);
        console.log("User Joined Room" , room);
    });

    socket.on("newMessage", (newMessageReceived) => {
        var chat = newMessageReceived.chat;
    
        if (!chat?.users) return console.log("chat.users not defined");
    
        chat.users.forEach((user) => {
          if (user?._id === newMessageReceived?.sender?._id) return;
        //   console.log(newMessageReceived);
          socket.in(user._id).emit("messageReceived", newMessageReceived);
        });
      });
});
