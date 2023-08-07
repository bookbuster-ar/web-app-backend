const { Editorial } = require('../../models');

const getEditorials = async () => await Editorial.findAll();

module.exports = getEditorials;
