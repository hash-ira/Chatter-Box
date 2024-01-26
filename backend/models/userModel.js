const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

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
    }},
    {
        timeStamp : true
});

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password);
};

userSchema.pre('save' , async function(next){
    if(!this.isModified){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model("User" , userSchema);

module.exports = User;