const mongoose = require('mongoose');
const crypto = require('crypto');

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
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date
    },

    { 
        timestamps: true
    },
)

userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    console.log({resetToken}, this.passwordResetToken)

    return resetToken;
}

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;