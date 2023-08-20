require('module-alias/register');

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const router = require('./routes');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api', router);

app.use('*', (req, res) => {
  return res.status(404).json({ message: 'Not found' });
});

module.exports = app;
