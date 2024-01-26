const express = require('express')
const dotenv = require('dotenv')
const { chats } = require('./../data.js')
const app = express();
const connectDB = require('./config/mongoDB.js');
const userRoutes = require("./routes/userRoutes.js");

dotenv.config({path:__dirname+'/../.env'});
connectDB();

app.use(express.json()); //for accepting JSON data

app.get('/' , (req , res) => {
    res.send("<h1> Hello Backend <h1>");
})

app.use("/user" , userRoutes);
app.use("/" , userRoutes);

const PORT = process.env.PORT || 3000;

app.listen( PORT , () => {
    console.log(`Listening on port ${PORT}`);
})