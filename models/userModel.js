const mongoose = require('mongoose');
const types = require('../utils/schemaTypes')
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: types.stringType('First name'),
    lastName: types.stringType('Last name'),
    dob: types.dateType('Date of birth'),
    email: types.emailType(),
    userName: types.stringType('User Name',true,true),
    phone: types.phoneType('Phone'),
    password:{
        type: String,
        required: [true,'Password is required']
    },
    role: {
        type: String,
        enum: ['Employee','Manager','ShopOwner','Admin'],
        required: [true,'Role is required'],
        default: 'Employee'
    },
    image: types.stringType('Image',false,false),
    isActive: types.boolType('Active'),
})

userSchema.pre('save',async function(next){
    try {
        const salt = await bcryptjs.genSalt(10)
        this.password = await bcryptjs.hash(this.password,salt);
        next();
    } 
    catch (error) {
        next(error)
    }
}
    
   
)

userSchema.methods.comparePassword = async function(password,encPassword) {
    return await bcryptjs.compare(password,encPassword)
}
const User = mongoose.model('User',userSchema);

module.exports = User;