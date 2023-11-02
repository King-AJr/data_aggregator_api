const authRoute = require('express').Router();
const { register } = require('../controllers/authController.js');

authRoute.post('/signUp', register);
// authRoute.post('/signIn', login);

// authRoute.post('/forgotPassword', forgotPassword)
// authRoute.patch('/resetPassword/:token', resetPassword)

module.exports = authRoute;
