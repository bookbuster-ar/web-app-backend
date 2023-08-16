const { handleIncreaseStock, handleRegisterFormat } = require('../../handlers');
const { Router } = require('express');
const stockRouter = Router();

stockRouter.post('/registerFormat', handleRegisterFormat);

stockRouter.post('/increaseStock', handleIncreaseStock);

module.exports = stockRouter;
