const express = require('express')
const path = require('path')
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

app.use("/api/user" , userRoutes);
app.use("/api/chat" , chatRoutes);
app.use("/api/message", messageRoutes);


// -----Deployment----------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

// ----------------------------------

const PORT = process.env.PORT || 4000;

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
    socket.on("setup", (userData) => {
        socket.join(userData?._id);
        socket.emit("connected");
    });

    socket.on("joinChat" , (room) => {
        socket.join(room);
    });

    socket.on("newMessage", (newMessageReceived) => {
        var chat = newMessageReceived.chat;
    
        if (!chat?.users) return;
    
        chat.users.forEach((user) => {
          if (user?._id === newMessageReceived?.sender?._id) return;
          socket.in(user._id).emit("messageReceived", newMessageReceived);
        });
      });
});
