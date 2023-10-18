
import redisClient from '../utils/redis'; // Import the Redis client utility
import mock_data from '../mock_responses/mockData'; // Import mock eCommerce data
import getJob from './apiInteractionControllers/jobs';


/**
 * fetch information from Redis cache or mock responses
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {Object} - Response object
 */

const fetchData = async (req, res) => {
  const { name, category } = req.body; // Extract the 'name' field from the request body
  const key = `${category}:${name}`; // Create a key for Redis using the 'name' value
  let response;

  try {

    const result = await redisClient.get(key); 
    
    if (result !== null) {
      // Cache hit: return response from cache
      res.status(200).json(JSON.parse(result)); // Respond with the cached data
    } else {
      if (category === 'job') {
        response = await getJob(name);
      } else {
        response = mock_data.filter((item) => `${category}:${item.name}` === key);
        // Filter the mock eCommerce data to find a matching item
      }

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

module.exports = fetchData;