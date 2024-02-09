const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler")

const protect = asyncHandler( async(req, res, next) => {
    let token = await req.headers.authorization;
    if( token && token.startsWith("Bearer")){
        try{
            token = token.split(" ")[1];

            const decoded = jwt.verify(token , process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        }catch(error){
            res.status(401);
            throw new Error("Authorization Error");
        }
    }
});

module.exports = { protect };