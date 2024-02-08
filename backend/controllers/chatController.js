const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const accessChat = asyncHandler( async(req , res) => {
    const { userId } = req.body;

    if(!userId){
        return res.sendStatus(400);
        
    }

    var isChat = await Chat.find({
        isGroupChat : false,
        $and: [
            { users:  { $elemMatch : {$eq : req.user._id } } },
            { users: { $elemMatch : {$eq : userId} }}
        ]
    }).populate("users" , "-passwords")
        .populate("latestMessage");
        
    isChat = await User.populate(isChat , {
        path : 'latestMessage.sender',
        select: "name email profilePicture"
    })
    
    if(isChat.length){
        res.send(isChat[0]);
    }else{
        var chatData = {
            chatName : "sender",
            isGroupChat: false,
            users: [req.user._id , userId],
        };
        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
              "users",
              "-password"
            );
            res.status(200).json(FullChat);
          } catch (error) {
            res.status(400);
            throw new Error(error.message);
          }
    }
});

const fetchChats = asyncHandler( async(req  ,res) => {
    try{
        Chat.find({ users : {$elemMatch : { $eq : req.user._id}}})
        .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const deleteChats = asyncHandler(async (req, res) => {
  try {
    const chatsToDelete = await Chat.find({ latestMessage: { $exists: false } });
    
    await Chat.deleteMany({ _id: { $in: chatsToDelete.map(chat => chat._id) } });

    res.status(200).json({ message: 'Chats without latestMessage deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = {accessChat , fetchChats , deleteChats};