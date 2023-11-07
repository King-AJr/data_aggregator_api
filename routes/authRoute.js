const authRoute = require('express').Router();
const { register } = require('../controllers/authController.js');

authRoute.post('/signUp', register);

module.exports = authRoute;
