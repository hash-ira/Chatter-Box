const asyncHandler = require('express-async-handler')
const User = require("../models/userModel");
const generateToken = require('./../config/generateToken');

const registerUser = asyncHandler(async(req , res) => {
    const {name , email , password , profilePicture } = req.body;

    if(!name || !email || !password || !profilePicture){
        res.status(400);
        throw new Error("Please Enter all the fields");
    }
        
    const userExists = await User.findOne({email});
    
    if(userExists){
        res.status(400);
        throw new Error("User already exists.");

    }

    const user = await User.create({
        name,
        email,
        password,
        profilePicture
    })

    if(user){
        res.status(200);

        res.json({
            _id : user._id,
            name : user.name,
            email : user.email,
            profilePicture : user.profilePicture,
            token : generateToken(user._id),
        })
    }else{
        res.status(400);
        throw new Error("Failed to create user.");
    }
});

const authenticateUser = asyncHandler( async(req , res) => {
    const {email , password} = req.body;

    const user = await User.findOne({email})

    if(user && ( await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profilePicture: user.profilePicture,
            token: generateToken(user._id),
        })
    }
})

const searchUsers = asyncHandler( async (req, res) => {
    const searchInput = req.query.search ? {
        $or:[
            {name : {$regex : req.query.search, $options: "i"} },
            {email : {$regex : req.query.search, $options: "i"} },
        ]
    }:{};

    const usersFound = await User.find(searchInput).find({_id : {$ne : req.user._id}});
    res.send(usersFound);
});

module.exports = { registerUser , authenticateUser, searchUsers };