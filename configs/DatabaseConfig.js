const Sequelize = require('sequelize');
// const Umzug = require('umzug');
const path = require('path');
const {
  DBDIALECT, DBHOST, DBPORT, DBUSERNAME, DBPASSWORD, DBNAME
} = require('./MysqlConstant');
const { UrlModel} = require('../models/schema');

const sequelize = new Sequelize(DBNAME,DBUSERNAME,DBPASSWORD, {
  host: DBHOST,
  port: parseInt(DBPORT),
  dialect: DBDIALECT,
  logging: (data) => {
    console.log(data);
  },
  operatorsAliases: false,
});

// const umzug     = new Umzug({
//   storage: "sequelize",

//   storageOptions: {
//     sequelize: sequelize
//   },
//   logging: (data) =>{console.log(data)},
//   migrations: {
//     params: [
//       sequelize.getQueryInterface(),
//       Sequelize
//     ],
//     path: path.join(__dirname, "../migrations"),
//     pattern: /\.js$/
//   }
// });

// var sequelize = new Sequelize('test', 'root', 'root');

const Url = UrlModel(sequelize, Sequelize);

const createDbConn = function () {
  return new Promise((resolve, reject) => {
    sequelize.authenticate()
      .then((res) => {
        console.log('db connection established successfully..');
          sequelize.sync()
            .then(() => {
              console.log('Database & tables created!');
              resolve()
            }).catch((err) => {
              console.log('error in db sync', err);
              reject();
            });
      }).catch((err) => {
        console.log('error in db connection', err);
        reject();
      });
  });
};

module.exports = {
  createDbConn,
  sequelize,
  Sequelize,
  Url
};