import redisClient from '../utils/redis';

class AppController {
  static getStatus(req, res) {
    const status = {
      redis: redisClient.isAlive(),
      db: false,
    };
    res.status(200).send(status);
  }

  // static async getStats(req, res) {
  //   const stats = {
  //     users: await redisClient.get("users"),
  //     files: await redisClient.get("files"),
  //   };
  //   res.status(200).send(stats);
  // }
}

export default AppController;
