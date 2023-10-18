/* eslint-disable no-await-in-loop */
import redisClient from '../utils/redis';
import mockData from '../mock_responses/mockData';
import capitalizeFirstLetter from '../utils/util';

/**
 * fetch information from Redis cache or mock response
 * @param {object} req - request object
 * @param {object} res - response object
 * @returns {object} response object
 */
class FetchDataController {
  static async fetchData(req, res) {
    try {
      let { category, name } = req.query;
      name = name.toString();
      category = category.replace(/[^a-zA-Z0-9 ]/g, '');
      console.log(category, name);

      const key = `${category}:${name}`;
      const result = await redisClient.get(key);
      console.log(key, result);

      // Check if result is in cache
      if (result !== null) {
        // cache hit, return cache result
        const parsedResult = JSON.parse(result);
        return res.status(200).json(parsedResult);
      }

      // cache miss, get data from mock response
      const response = mockData.find((item) => `${category}:${item.name}` === key);

      // store in cache
      if (response) {
        await redisClient.set(key, JSON.stringify(response), 86400);
        return res.status(200).json(response);
      }
      return res.status(404).json({ error: 'Product not found' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server error' });
    }
  }

  static async getProductByName(req, res) {
    try {
      let { name } = req.query;
      name = capitalizeFirstLetter(name);

      const key = `ecommerce:${name}`;
      const result = await redisClient.get(key);

      // Check if result is in cache
      if (result !== null) {
        // cache hit, return cache result
        const parsedResult = JSON.parse(result);
        return res.status(200).json({ data: parsedResult, source: 'Redis cache' });
      }

      // cache miss, get data from mock response
      const response = mockData.find((item) => item.name === name);

      if (response) {
        // Store in cache
        await redisClient.set(key, JSON.stringify(response), 86400);

        return res.status(200).json({ data: response, source: 'api' });
      }
      return res.status(404).json({ error: 'Product not found' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server error' });
    }
  }

  static async clearDb(req, res) {
    try {
      await redisClient.clear();
      return res.status(200).json({ message: 'Cache cleared' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server error' });
    }
  }
}

export default FetchDataController;
