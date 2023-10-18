import redisClient from '../utils/redis';

class AppController {
  static getStatus(req, res) {
    const status = {
      redis: redisClient.isAlive(),
      db: false,
    };
    res.status(200).send(status);
  }

  static async getStats(req, res) {
    const stats = {
      product: await redisClient.get('ecommerce:Smartphone'),
      no_cache: await redisClient.size(),
    };
    res.status(200).send(stats);
  }
}

export default AppController;
