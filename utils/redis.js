import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.clientGet = promisify(this.client.get).bind(this.client);
    this.client.on('error', (error) => {
      console.log(`Redis client not connected to the server: ${error.message}`);
    });

    this.client.on('connect', () => {
      console.log('Redis client connected to the server');
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    const value = await this.clientGet(key);
    return value;
  }

  async set(key, value, duration) {
    this.client.setex(key, duration, value);
  }

  async del(key) {
    this.client.del(key);
  }

  async clear() {
    this.client.flushall('ASYNC', (err, succeeded) => {
      if (err) {
        console.error('Error clearing cache:', err);
      } else {
        console.log('Cache cleared:', succeeded);
      }
      // Close the Redis connection
      this.client.quit();
    });
  }

  async size() {
    this.client.dbsize((err, numberOfKeys) => {
      if (err) {
        console.error('Error getting number of keys:', err);
      } else {
        console.log('Total number of keys in Redis:', numberOfKeys);
      }
      // Close the Redis connection
      this.client.quit();
    });
  }
}

const redisClient = new RedisClient();

export default redisClient;
