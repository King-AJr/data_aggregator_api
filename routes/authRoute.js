const router = require('express').Router();
const { register, login, forgotPassword, resetPassword } = require('../controllers/authController.js');

router.post('/signUp', register);
router.post('/signIn', login);

router.post('/forgotPassword', forgotPassword)
router.patch('/resetPassword/:token', resetPassword)

module.exports = router;
