const { updateUserProfile } = require('../../controllers');

const handleUpdateUserProfile = async (req, res) => {
  const { userid: userId } = req.headers;
  const {
    name,
    lastname,
    email,
    aboutMe,
    wantNotifications,
    country,
    address,
    city,
    province,
    postalCode,
  } = req.body;

  const userInfo = {
    id: userId,
    name,
    lastname,
    email,
    aboutMe,
    wantNotifications,
  };
  const userAddress = { country, address, city, province, postalCode };

  try {
    const updatedUser = await updateUserProfile(userInfo, userAddress);
    return res.status(201).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = handleUpdateUserProfile;
