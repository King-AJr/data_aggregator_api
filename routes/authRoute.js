const router = require('express').Router();
const { register, login } = require('../controllers/authController.js');

router.post('/signUp', register);
router.post('/signIn', login);

module.exports = router;
