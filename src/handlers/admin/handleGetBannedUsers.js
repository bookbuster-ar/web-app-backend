const { getBannedUsers } = require('../../controllers');

const handleGetBannedUsers = async (req, res) => {
  try {
    const bannedUsers = await getBannedUsers();
    return res.status(200).json(bannedUsers);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleGetBannedUsers;
