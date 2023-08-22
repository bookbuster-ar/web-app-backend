const { User, Role } = require('../../models');
const updateUserRole = async (userId, roleId) => {
  const user = await User.findByPk(userId);
  user.role_id = roleId;
  await user.save();
  const updatedRole = await Role.findByPk(roleId);
  return {
    user: {
      name: user.name,
      last_name: user.last_name,
      email: user.email,
    },
    role: {
      name: updatedRole.name,
    },
  };
};

module.exports = updateUserRole;
