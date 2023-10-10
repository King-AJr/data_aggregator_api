import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => {
      console.log(`[Redis]: Connection error: ${err}`);
    });
  }

  isAlive() {
    if (this.client.connected) {
      return true;
    }
    return false;
  }

  async get(key) {
    const getData = await promisify(this.client.get).bind(this.client);
    const value = await getData(key);
    return value;
  }

  async set(key, value, duration) {
    const setData = await promisify(this.client.set).bind(this.client);
    await setData(key, value);
    await this.client.expire(key, duration);
  }

  async del(key) {
    const delData = await promisify(this.client.del).bind(this.client);
    const value = await delData(key);
    return value;
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
