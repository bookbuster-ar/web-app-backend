const { Sequelize } = require('sequelize');

const {
  DB_URL,
  ENVIORMENT,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
} = require('../utils/env');

const sequelize =
  ENVIORMENT === 'production'
    ? new Sequelize(DB_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        logging: false,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      })
    : new Sequelize('bookbuster', DB_USER, DB_PASSWORD, {
        host: DB_HOST,
        dialect: 'postgres',
        logging: false,
      });

module.exports = sequelize;
