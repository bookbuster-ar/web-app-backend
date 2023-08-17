const { User, UserAddress } = require('../../models');
const admin = require('../../config/firebase/admin');

const updateUserProfile = async (userInfo, userAddress) => {
  const { id, name, lastname, email, aboutMe, wantNotifications } = userInfo;
  const { country, address, city, province, postalCode } = userAddress;

  const [outdatedUser, outdatedAddress] = await Promise.all([
    User.findByPk(id),
    UserAddress.findOne({ where: { user_id: id } }),
  ]);

  const updatedUser = await outdatedUser.update({
    name: name ?? outdatedUser.name,
    lastname: lastname ?? outdatedUser.lastname,
    email: email ?? outdatedUser.email,
    about: aboutMe ?? outdatedUser.aboutMe,
    want_notifications: wantNotifications ?? false,
  });

  const updatedAddress = await outdatedAddress.update({
    country: country ?? outdatedAddress.country,
    address: address ?? outdatedAddress.address,
    city: city ?? outdatedAddress.city,
    province: province ?? outdatedAddress.province,
    postal_code: postalCode ?? outdatedAddress.postal_code,
  });

  await updatedUser.setAddress(updatedAddress);

  await admin.auth().updateUser(outdatedUser.firebase_id, { email });
};

module.exports = updateUserProfile;
