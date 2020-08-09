const mongoose = require('mongoose');
var validator = require('validator');

const customers  = new mongoose.Schema({
    firstName: {
        required: [true,'First name is required'],
        type:String
    },
    lastName: { type: String},
    age: Number,
    email: {
        required:[true,'Email is required'],
        type:String,
        validate: value=>validator.isEmail(value)
        ,unique:[true,'bla bla bla']
    }
}) 

const Customer = mongoose.model('Customer',customers)

module.exports = Customer;
