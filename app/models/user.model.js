const mongoose = require('mongoose');

const userSchema  = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    accept_privacy: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('user', userSchema, 'user-login');