const { Role } = require('../../models');

const getRoles = async () => {
  const roles = await Role.findAll();
  return roles;
};

module.exports = getRoles;
