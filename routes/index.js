const router = require('express').Router();
const getProduct = require('../controllers/e-commerceController.js');
const getJob = require('../controllers/jobsController');
const getListing = require('../controllers/realEstateController');


router.post('/search', (req, res) => {
    const { category } = req.body;
    if (category === 'e-commerce') {
        getProduct(req, res);
    } else if (category === 'job') {
        getJob(req, res);
    }
    else if (category === 'real estate') {
        getListing(req, res);
    }
});
module.exports = router;
