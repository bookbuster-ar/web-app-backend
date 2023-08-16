const nodemailer = require('nodemailer');
const { USER_NODEMAILER, PASS_NODEMAILER } = require('../utils/env');

const nodemailerConfig = {
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: USER_NODEMAILER,
    pass: PASS_NODEMAILER,
  },
};
const transporter = nodemailer.createTransport(nodemailerConfig);

module.exports = transporter;
