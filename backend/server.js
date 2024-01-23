const express = require('express')
const dotenv = require('dotenv')
const { chats } = require('./../data.js')
const app = express();

require('dotenv').config({path:__dirname+'/../.env'});


app.get('/' , (req , res) => {
    res.send("<h1> Hello Backend <h1>");
})

app.get('/chat' , (req , res) => {
    res.send(chats);
})

const PORT = process.env.PORT || 3000;

app.listen( PORT , () => {
    console.log(`Listening on port ${PORT}`);
})