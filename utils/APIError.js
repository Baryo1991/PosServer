module.exports = class APIError {
    constructor(status,reason){
        this.status = status;
        this.reason = reason
    }
}