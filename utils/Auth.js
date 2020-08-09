const JWT = require('jsonwebtoken');
const APIError = require('./APIError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const Permission = require('../models/permissionModel');

const secretKey = "123456789"

exports.buildToken = (userId) => {
    const payload = {
        userId
    };

    return JWT.sign(payload,secretKey,{
        expiresIn: '1d',
    })
}

exports.protectedRoute = catchAsync(async (req, res, next) => {
    if(!req.headers.authorization){
        return  next(new APIError(403,'Could not found API token'));
    }
    
    const bearer = req.headers.authorization;
    const token = bearer.split(' ')[1];

    if(!token)
        return next(new APIError(403,'Could not found API token'));
    const decoded = JWT.verify(token,secretKey);
    const user = await User.findById(decoded.userId);

    if(!user){
        return next(new APIError(403,'Could not found user...'));
    }
    if(!user.isActive)
        return next(new APIError(403,'User is not active'));
    req.user = user;
    next();
})


exports.permissions = catchAsync( async (req, res, next) => {
    const baseRoute = req.path.replace(`${process.env.root}/`,'').split('/')[0];
    
    const isParams = Object.keys(req.params).length > 0;
    
    const httpMethod = req.method.toLowerCase();
    const permission = await Permission.findOne({$and: [{route: baseRoute},{method: httpMethod}]});
    if(!permission)
        return next(new APIError(401,'Access denied'))
    const user  = req.user;
    if(permission.roles.find(role=> role == user.role)){
       return next();
    }
    next(new APIError(401,'No permission'))
})