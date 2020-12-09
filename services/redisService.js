const TAG = 'RedisService.js ';

class RedisService {
    constructor() {
    }
    insertRedis(input) {
      return new Promise(async (resolve, reject) => {
        try {
            console.log(`in ${TAG} insertRedis`);
            let delCount,delKey,flag = false;
            let totalCount = await redisConn.zcard("countCache");
            if(totalCount == 3){
                delKey = await redisConn.zrange("countCache",0,0);
                delCount = await redisConn.zscore("countCache",delKey)
                flag = true
                await redisConn.zrem("countCache",delKey)
                await redisConn.del(delKey)
            }
            await redisConn.zadd("countCache",parseInt(input.count/2)+1,input.shortUrl)
            await redisConn.set(input.shortUrl,input.originalUrl)
            if(flag){
                resolve({delKey,delCount});
            }else{
                resolve(false)
            }
        } catch (e) {
            console.log(`${TAG} error : ${e}`);
            reject(e);
        }
      });
    }
  
    getRedis(id) {
      return new Promise(async (resolve, reject) => {
        try {
            const res = await redisConn.get(id);
            if(res){
                await redisConn.zincrby("countCache", 1, id)
            }
            resolve(res);
        } catch (e) {
          console.log(`${TAG} error : ${e}`);
          reject(e);
        }
      });
    }
}

const redisService = new RedisService();
module.exports = redisService;

