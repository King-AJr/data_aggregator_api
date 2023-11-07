//check for authorization header
  //if authorization header is present
    //check if it is in the database
      //if in db proceed with request
      //else respond with error saying incorrect api key
  //else authorization header absent 
const User = require('../models/usersModel');
const errorResponse = require('../utils/errorResponse');

exports.verifyAPIKey = async (req, res, next) => {
    try {
        const key = req.headers.authorization;
        if(!key) {
            return next(new errorResponse('Please provide an api key', 400));
        }

        const user = User.findOne({ api_key: key });
        if (!user) {
            return next(new errorResponse('Incorrect api key', 400));
        }

        next();
    } catch (error) {
        next(error);
    }
}