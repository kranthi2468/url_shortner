const TAG = 'UrlService.js ';
const { UrlSchema } = require('../models/model');
const { Url } = require('../configs/DatabaseConfig');
const uniqueShortId  = require('../configs/uniqueShortId');
const redisService = require('../services/redisService');

class UrlService {
    constructor() {
    //   this.httpDao = new HttpDao();
    }
    createUrl(input) {
      return new Promise(async (resolve, reject) => {
        try {
            console.log(`in ${TAG} createUrl`);
            const url = new UrlSchema();
            url.originalUrl = input.originalUrl;
            url.shortUrl = uniqueShortId.generate();
            url.count = input.count?input.count:0;
            const res = await Url.create(url);
            resolve(makeResult(201, res));
        } catch (e) {
            console.log(`${TAG} error : ${e}`);
            reject(e);
        }
      });
    }
  
    getUrl(input) {
      return new Promise(async (resolve, reject) => {
        try {
            let redisRes = await redisService.getRedis(input.id)
            if(redisRes){
                console.log("Found in redis",input.id,redisRes)
                resolve(makeResult(201, {redisRes}));
            }else{
                console.log("Not found in redis, searching in DB...")
                const res = await Url.findOne({where: {shortUrl: input.id}});
                if(!res){
                    return reject(makeResult(400,"no record found"))
                }
                let insertRes = await redisService.insertRedis(res);
                if(insertRes){
                    console.log(insertRes)
                    const newRes = await Url.findOne({where: {shortUrl: insertRes.delKey}});
                    newRes.count = insertRes.delCount
                    const updateDbRes =await newRes.save({fields: ['count'] });
                }
                resolve(makeResult(201, res));
            }
        } catch (e) {
          console.log(`${TAG} error : ${e}`);
          reject(e);
        }
      });
    }
}

const urlService = new UrlService();
module.exports = urlService;