import redisClient from '../utils/redis'; // Import the Redis client utility
import e_commerce from '../mock_responses/ecommerce'; // Import mock eCommerce data


/**
 * Get product information from Redis cache or mock responses
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {Object} - Response object
 */

const getProduct = async (req, res) => {
  const { name } = req.body; // Extract the 'name' field from the request body
  const key = `ecommerce:${name}`; // Create a key for Redis using the 'name' value

  try {
    const result = await redisClient.get(key); // Try to retrieve data from the Redis cache

    if (result !== null) {
      // Cache hit: return response from cache
      res.status(200).json(JSON.parse(result)); // Respond with the cached data
    } else {
      const response = e_commerce.filter((item) => `ecommerce:${item.name}` === key);
      // Filter the mock eCommerce data to find a matching item

      if (response.length > 0) {
        // Store response in cache if a matching item is found
        const cacheData = await redisClient.set(`${key}`, response, 24 * 60 * 60); // Cache the response in Redis
        res.status(200).json(response); // Respond with the retrieved data
      } else {
        // No matching data found
        res.status(404).json({ error: 'No matching data found' }); // Respond with a 404 status and an error message
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = getProduct;
