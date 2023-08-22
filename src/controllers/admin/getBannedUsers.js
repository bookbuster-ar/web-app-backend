const { User } = require('../../models');

const getBannedUsers = async () => {
  const users = await User.findAll({
    where: {
      is_blocked: true,
    },
    include: ['image'],
  });
  formattedUsers = users.map((user) => ({
    id: user.id,
    name: user.name,
    last_name: user.last_name,
    email: user.email,
    image: user.image ? user.image.image : null,
  }));
  return formattedUsers;
};

module.exports = getBannedUsers;
