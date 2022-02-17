const mongoose = require('mongoose');

const {Schema} = mongoose;

const userModel = new Schema(
    {
        firstName: {type: String, text: true},
        lastName: {type: String, text:true},
        userName: {type: String},
        password: {type: String},
        email: {type: String},
        address: {type: String},
        phone: {type: Number}
    }
)

module.exports = mongoose.model('User', userModel);