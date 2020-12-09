const app = require('./app');
// const constants = require('~/constants/SystemConstant');
const { createDbConn } = require('./configs/DatabaseConfig');
const { createRedisConn } = require('./configs/RedisConfig');

const port = 3000//process.env.PORT || constants.defaultPort;
const main = async () => {
  try {
    await createDbConn();
    await createRedisConn();
    app.listen(port, () => console.log('listening on port ', port));
  } catch (e) {
    console.log('failure in main..', e);
    process.exit();
  }
};
main();