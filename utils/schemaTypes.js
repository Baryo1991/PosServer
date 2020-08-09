const { default: validator } = require('validator');

exports.stringType = (fieldName,required = true,unique = false) => {
    return {
        type: String,
        required: [required,`${fieldName} is required`],
        unique: unique
    }
}

exports.boolType = (fieldName,required = true,defaultValue = true) => {
    return {
        type: Boolean,
        required: [required,`${fieldName} is required`],
        default: defaultValue
    }
}

exports.dateType = (fieldName,required = true) => {
    return {
        type: Date,
        default: Date.now(),
        required: [required,`${fieldName} is required`],
    }
}

exports.emailType = (required = true, unique = true) => {
    return {...this.stringType('Email address',required,unique),
        validate: value=>validator.isEmail(value)
    }
}

exports.phoneType = (fieldName,required,unique = true) => {
    return {
        ...this.stringType(fieldName,required,unique),
        validate: value=> validator.isMobilePhone(value,'he-IL')
    }
}