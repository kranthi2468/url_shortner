exports.UrlModel = (sequelize, Sequelize) =>
  sequelize.define('url', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    originalUrl: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true
    },
    shortUrl: {
      type: Sequelize.STRING,
      unique: true
    },
    count: {
        type: Sequelize.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });