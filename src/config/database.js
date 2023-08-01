const { Sequelize } = require('sequelize');

const { DB_USER, DB_PASSWORD, DB_HOST } = require('../utils/env');

const sequelize = new Sequelize('bookbuster', DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
});

module.exports = sequelize;
