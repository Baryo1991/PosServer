const mongoose = require('mongoose');
const types = require('../utils/schemaTypes')

const permissionSchema = new mongoose.Schema({
    route: types.stringType('Route'),   
    method: {...types.stringType('Method'),
        enum: ['post','get','put','delete','patch']
    },
    isParams: types.boolType('isParams',true,false),
    roles: [{
        ...types.stringType('Roles'),
        enum: ['Employee','Manager','ShopOwner','Admin']
    }]

})

const Permission = mongoose.model('Permission',permissionSchema);

module.exports = Permission;