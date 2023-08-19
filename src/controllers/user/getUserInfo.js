const { User } = require('../../models');
const { convertKeysToCamelCase } = require('../../utils');

const getUserInfo = async (userId) => {
  const user = await User.findByPk(userId, {
    include: ['image', 'address'],
  });

  const { firebase_id, role_id, image_id, ...userInfo } = user.toJSON();
  const { id, user_id, ...addressInfo } = user.toJSON().address;

  return {
    ...convertKeysToCamelCase(userInfo),
    image: userInfo.image?.image,
    address: {
      ...convertKeysToCamelCase(addressInfo),
    },
  };
};

module.exports = getUserInfo;
