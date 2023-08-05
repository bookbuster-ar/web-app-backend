const { Sequelize } = require('sequelize');

const { DB_URL } = require('../utils/env');

const sequelize = new Sequelize(DB_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;
