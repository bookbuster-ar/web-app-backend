const { handleIncreaseStock, handleRegisterFormat, handlePostPriceAndFormat } = require('../../handlers');
const { Router } = require('express');
const stockRouter = Router();

stockRouter.post('/registerFormat', handleRegisterFormat);

stockRouter.post('/increaseStock', handleIncreaseStock);

stockRouter.post('/formatprice', handlePostPriceAndFormat);

module.exports = stockRouter;
