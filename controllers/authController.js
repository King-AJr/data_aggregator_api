const User = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const errorResponse = require('../utils/errorResponse');
const sendApiKey = require('./emailSender');
const {v4: uuidv4} = require('uuid')

exports.register = async (req, res, next) => {
    try {
        const { name, email } = req.body;
        if(!name || !email) {
            return next(new errorResponse('Please provide an email, name and password', 400));
        }
        const checkUser = await User.findOne({ email });
        if(checkUser) {
            return next(new errorResponse('User already exists', 400));
        }
        const api_key = uuidv4();
        const user = await User.create({
            name,
            email,
            api_key
        });
        try {
            const userDetails = User.findOne({ email });
            if (userDetails) {
                console.log('in userdetails fx')
                delete user["password"];
               sendApiKey(user, res)
            } else {
                res.status(500).json({
                    status: 'failed',
                    message: 'account creation not successful'
                });
            }
        } catch (e) {
            //log error
        }
    } catch (error) {
        next(error);
    }
}

//check for authorization header
  //if authorization header is present
    //check if it is in the database
      //if in db proceed with request
      //else respond with error saying incorrect api key
  //else authorization header absent 