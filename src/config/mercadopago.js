const mercadopago = require('mercadopago');
const { ACCESS_TOKEN } = require('../utils/env');

mercadopago.configure({
  access_token: ACCESS_TOKEN,
});

module.exports = mercadopago;
