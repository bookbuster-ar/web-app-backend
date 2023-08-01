const { Sequelize } = require('sequelize');
const path = require('path');

require('dotenv').config({
  path: path.resolve(__dirname, '../../.env'),
});

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize('bookbuster', DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
});

module.exports = sequelize;
