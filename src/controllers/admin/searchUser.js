const { Op } = require('sequelize');
const { User } = require('../../models');

const searchUser = async (name) => {
  try {
    const users = await User.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${name}%` } },
          { last_name: { [Op.iLike]: `%${name}%` } },
        ],
      },
    });
    return users;
  } catch (error) {
    throw error;
  }
};

module.exports = searchUser;
