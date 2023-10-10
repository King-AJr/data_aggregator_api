import redisClient from '../utils/redis';
import e_commerce from '../mock_responses/ecommerce';

const getProduct = (req, res) => {
// check cache for result
let response = [];
const {name} = req.body;
const key = `ecommerce:${name}`
try {
    const result = redisClient.get(key);
    // if cache hit return response 
    if (result !== nil) {
        res.status(200).json(result);
    } else {
        // send request to API and web scraper
        for (i in e_commerce) {
            if (i.category === 'e-commerce') {
                response.push(i)
                redisClient.set(`ecommerce:${i.name}`, i, 24 * 60 * 60);
            }
        }

        res.status(200).json(response);
        // store response in cache and respond
    }


} catch(err) {
    //log error
}




}

module.exports = getProduct;