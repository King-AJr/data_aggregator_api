/* eslint-disable no-await-in-loop */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import redisClient from '../utils/redis';
import mock_data from '../mock_responses/mockData';
import capitalizeFirstLetter from '../utils/util';

class EcommerceController {
  static async getProduct(req, res) {
    try {
      const name = req.body;

      const key = `ecommerce:${name}`;
      const result = await redisClient.get(key);

      // Check if result is in cache
      if (result !== null) {
        // cache hit, return cache result
        const parsedResult = JSON.parse(result);
        return res.status(200).json(parsedResult);
      }

      // cache miss, get data from mock response
      const response = mock_data.filter((item) => item.category === 'e-commerce');

      // store in cache
      for (const item of response) {
        await redisClient.set(`ecommerce:${item.name}`, JSON.stringify(item), 86400);
      }

      return res.status(200).json(response);
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
      const response = mock_data.find((item) => item.name === name);

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
}

export default EcommerceController;
