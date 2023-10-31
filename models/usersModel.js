const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'name is required']
        },
        email: {
            type: String,
            required: [true, 'email is required']
        },
        password: {
            type: String,
            required: [true, 'password is required']
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user'
        },
    },

    { 
        timestamps: true
    },
)

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;