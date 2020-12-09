const Redis = require('ioredis');
// const lru = require('redis-lru');

exports.createRedisConn = async function () {
  return new Promise((resolve, reject) => {
    const redis = new Redis();
    // const urlCache = lru(redis, {max: 2, score: () => 1, increment: true});
    redis.on('error', (err) => {
      console.log(`Redis error: ${err}`);
      reject(err);
    });
    redis.on('connect', async (err) => {
        console.log('Connected to Redis');
        await redis.zadd("countCache",1,"a");
        await redis.zrem("countCache","a");
        let zcount = await redis.zcard("countCache")
        console.log('countCache set successfully , count ',zcount);
        global.redisConn =  redis;
        exports.redisConn = redis;
      resolve();
    });
  });
};