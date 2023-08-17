const { handleIncreaseStock } = require('../../handlers');
const { Router } = require('express');
const stockRouter = Router();

stockRouter.post('/increaseStock', handleIncreaseStock);

module.exports = stockRouter;
