const catchAsync = require("../utils/catchAsync");
const User = require('../models/userModel');
const APIError = require("../utils/APIError");
const { buildToken } = require("../utils/Auth");

exports.signIn = catchAsync(async(req, res, next) => {
    const {userName,password} =  req.body;
    if(!userName || !password)
        return next(new APIError(402,"Could not found user name or password"));
    
    const desiredUser = await User.findOne({userName});
    if(!desiredUser)
        return next(new APIError(402,"User name is not exist"));
     
    if(desiredUser.comparePassword(password,desiredUser.password)){
        const token = buildToken(desiredUser._id);
        res.status(200).json({
            status: 'success',
            token
        })
    }

})