const { User, UserImage, Role } = require('../../models');

const getUsers = async () => {
  const users = await User.findAll({
    include: [
      {
        model: UserImage,
        as: 'image',
        attributes: ['image'],
      },
      {
        model: Role,
        as: 'role',
        attributes: ['name'],
      },
    ],
  });
  const formattedUsers = users.map((user) => ({
    id: user.id,
    name: user.name,
    last_name: user.last_name,
    email: user.email,
    subscription: user.subscription,
    date_of_register: user.date_of_register,
    is_blocked: user.is_blocked,
    credit: user.credit,
    image: user.image ? user.image.image : null,
    role: user.role ? user.role.name : null,
  }));

  return formattedUsers;
};
module.exports = getUsers;
