const { getRoles } = require('../../controllers');

const handleGetRoles = async (req, res) => {
  try {
    const roles = await getRoles();
    return res.status(200).json(roles);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleGetRoles;
