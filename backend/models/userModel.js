const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },

    email:{
        type: String,
        required : true,
        unique: true
    },

    password : {
        type: String,
        required: true
    },

    profilePicture:{
        type : String,
        default : "https://simplyilm.com/wp-content/uploads/2017/08/temporary-profile-placeholder-1.jpg"
    }
});

const User = mongoose.model("User" , userSchema);

module.exports = User;