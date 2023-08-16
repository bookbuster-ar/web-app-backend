const { Editorial } = require('../../models/index');

const getEditorials = async () => await Editorial.findAll();

module.exports = getEditorials;
