const User = require('../models/usersModel');
const errorResponse = require('../utils/errorResponse');
const sendApiKey = require('./emailSender');
const {v4: uuidv4} = require('uuid')

exports.register = async (req, res, next) => {
    try {
        const { name, email } = req.body;
        if(!name || !email) {
            return next(new errorResponse('Please provide an email and name', 400));
        }
        const checkUser = await User.findOne({ email });
        if(checkUser.email === email || checkUser.name === name || !checkUser) {
            return next(new errorResponse('User already exists', 400));
        }

        const api_key = uuidv4();
        const user = await User.create({
            name,
            email,
            api_key
        });
        user.save();

        if (checkUser) {
            sendApiKey(user, res)
        } else {
            res.status(500).json({
                status: 'failed',
                message: 'account creation not successful'
            });
        }
        res.status(200).json({
            status: 'success',
            user,
            message: 'account created successfully'
        });

    } catch (error) {
        // nothing should be stored in the database if an error occurs
        userDetails.name = undefined;
        userDetails.email = undefined;
        userDetails.api_key = undefined;
        next(error);
    }
}