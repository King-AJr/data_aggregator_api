
import redisClient from '../utils/redis'; // Import the Redis client utility
import mock_data from '../mock_responses/mockData'; // Import mock eCommerce data
import getJob from './apiInteractionControllers/jobs';
import getListings from './apiInteractionControllers/realEstate';

/**
 * fetch information from Redis cache or mock responses
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {Object} - Response object
 */

const fetchData = async (req, res) => {
  
  try {
    const { name, category, city } = req.body;
    let key;

    if (category === 'realEstate') {
      const { type, postalCode } = req.body;
      key = `${category}:${type}:${postalCode}:${city}`;
    } else {
      key = `${category}:${name}`;
    }

    const result = await redisClient.get(key);

    if (result !== null) {
      console.log('Cache hit');
      return res.status(200).json(result);
    }

    let response;

    if (category === 'job') {
      response = await getJob(name);
    } else if (category === 'realEstate') {
      const { type, postalCode } = req.body;
      response = await getListings(type, postalCode, city);
    } else {
      response = mock_data.find((item) => `${category}:${item.name}` === key);
    }

    if (response && response.length > 0 && typeof response !== 'string') {
      const cacheData = await redisClient.set(key, JSON.stringify(response), 48 * 60 * 60);
      return res.status(200).json(response);
    } else {
      return res.status(404).json({ error: 'No matching data found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = fetchData;