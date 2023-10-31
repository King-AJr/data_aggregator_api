const User = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const errorResponse = require('../utils/errorResponse');

exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if(!name || !email || !password) {
            return next(new errorResponse('Please provide an email, name and password', 400));
        }
        const hashedPassword = await bcrypt.hash(password, 12);
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