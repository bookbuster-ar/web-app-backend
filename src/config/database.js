const { Sequelize } = require('sequelize');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_URL } = require('../utils/env');

const ENVIROMENT = 'dev';

const sequelize =
  ENVIROMENT === 'dev'
    ? new Sequelize('bookbuster', DB_USER, DB_PASSWORD, {
        host: DB_HOST,
        dialect: 'postgres',
      })
    : new Sequelize(DB_URL, {
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
