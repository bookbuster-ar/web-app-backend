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
};

module.exports = handleUpdateUserProfile;
