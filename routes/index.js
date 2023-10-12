const router = require('express').Router();
const fetchData = require('../controllers/fetchDataController.js');


router.post('/search', (req, res) => {
    const { category, name } = req.body;
    if (category === 'e-commerce' || category === 'job' || category === 'real estate') {
        if (name !== null && name !== '' && name !== undefined) {
            fetchData(req, res);
        } else {
            res.status(404).json({message: 'name is required'})
        }
    }
    else {
        res.status(404).json({message: 'Category can only be e-commerce, job or real estate'})
    }
});
module.exports = router;
