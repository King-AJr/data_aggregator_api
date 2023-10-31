const User = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const errorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/email');
const crypto = require('crypto');

exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if(!name || !email || !password) {
            return next(new errorResponse('Please provide an email, name and password', 400));
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const checkUser = User.findOne({ email }).select('+password');
        if(checkUser) {
            return next(new errorResponse('User already exists', 400));
        }

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        }); 
        res.status(201).json({
            success: true,
            user: user
        })
    } catch (error) {
        next(error);
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return next(new errorResponse('Please provide an email and password', 400));
        }
        const user = await User.findOne({ email }).select('+password');
        if(!user) {
            return next(new errorResponse('Invalid credentials', 401));
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return next(new errorResponse('Invalid credentials', 401));
        }
        const token = jwt.sign({ id: user._id },
        process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
        res.status(200).json({
            success: true,
            user: user,
            access_token: token,
            message: 'User logged in successfully'
        })
    } catch (error) {
        next(error);
    }
}

exports.forgotPassword = async (req, res, next) => {

     // get user based on email
     const { email } = req.body;
     if(!email) {
         return next(new errorResponse('Please provide an email', 400));
     }

    const user = await User.findOne({ email });
    if (!user) return next(new errorResponse('There is no user with this email', 404));

    try {
        // create a reset token
        const resetToken = user.createPasswordResetToken();
        await user.save({ validateBeforeSave: false });

        // send it to user's email
        const resetURL = `${req.protocol}://${req.get('host')}/api/v1/auth/resetPassword/${resetToken}`;
        const message = `Forgot your password? Submit a PATCH request with your new password and
        passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

        await sendEmail({
            email: user.email,
            subject: 'Your password reset token (valid for 10 min)',
            message
        });

        res.status(200).json({
            success: true,
            message: 'Token sent to email!'
        });

    } catch (error) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new errorResponse('There was an error sending the email. Try again later!', 500));
    }
}

exports.resetPassword = async (req, res, next) => {
    try {
        // get user based on the token
        const hashedToken = crypto.createHash('sha256')
        .update(req.params.token).digest('hex');
        const user = await User.findOne({ 
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() } 
        });

        // if token has not expired, and there is user, set the new password
        if (!user) return next(new errorResponse('Token is invalid or has expired', 400));

        // update changedPasswordAt property for the user
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        user.password = hashedPassword;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        // log the user in, send JWT
        const token = jwt.sign({ id: user._id },
            process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
        res.status(200).json({
            success: true,
            token,
            message: 'Password reset successful'
        });

    } catch (error) {
        next(error)   
    }
}