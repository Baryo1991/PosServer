const Permission = require('../models/permissionModel');
const catchAsync = require('../utils/catchAsync');
const APIError = require('../utils/APIError');

exports.generatePermissions = catchAsync(async(req, res, next) => {

    const source = req.params.source;
    if(!source)
       return next(new APIError(404,'source was not specified'))

    const methods = ['get','post','patch','put','delete']
    methods.forEach(async(method) => {
        const newPermission = new Permission({
            isParams:true,
            method: method,
            route: source,
            roles: ['Employee','Manager','ShopOwner','Admin']
        })
        await newPermission.save();
    })
    const newPermission = new Permission({
        isParams:false,
        method: 'get',
        route: source,
        roles: ['Employee','Manager','ShopOwner','Admin']
    })
    await newPermission.save();
    res.status(200)
        .json({
            status: 'success',
            data: null
        })
})

    