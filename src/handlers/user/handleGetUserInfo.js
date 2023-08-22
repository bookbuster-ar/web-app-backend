const { getUserInfo } = require('../../controllers');

const handleGetUserInfo = async (req, res) => {
  const { userid: userId } = req.headers;
  console.log(userId);
  try {
    const userInfo = await getUserInfo(userId);
    return res.status(200).json(userInfo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleGetUserInfo;
