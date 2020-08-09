const APIError = require('../utils/APIError')

module.exports = fn => {
        return (req,res,next) =>{
            fn(req,res,next)
                .catch(err=>{
                    next(new APIError(500,err))
                })
        };

}