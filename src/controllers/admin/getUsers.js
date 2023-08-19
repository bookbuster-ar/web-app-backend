const { User } = require('../../models');

const getUsers = async () => {
  const user = await User.findAll();
  return user;
};

module.exports = getUsers;
