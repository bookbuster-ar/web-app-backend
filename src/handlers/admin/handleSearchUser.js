const { searchUser } = require('../../controllers');

const handleSearchUser = async (req, res) => {
  const { name } = req.query;
  try {
    if (name.length < 3)
      return res
        .status(400)
        .json({ error: 'La consulta debe tener al menos 3 letras' });
    const users = await searchUser(name);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleSearchUser;
