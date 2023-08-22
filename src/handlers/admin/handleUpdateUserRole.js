const { updateUserRole } = require('../../controllers');

const handleUpdateUserRole = async (req, res) => {
  const { userId } = req.params;
  const { roleId } = req.body;
  try {
    const updatedUser = await updateUserRole(userId, roleId);
    return res
      .status(200)
      .json({ msg: 'El rol del usuario ha sido actualizado', updatedUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleUpdateUserRole;
