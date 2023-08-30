const { User, UserAddress, UserImage } = require('../../models');

const sequelize = require('../../config/database');
const cloudinary = require('../../config/cloudinary');
const admin = require('../../config/firebase/admin');

const { v4: uuidv4 } = require('uuid');
const { convertKeysToCamelCase } = require('../../utils');
const updateUserProfile = async (userInfo, userAddress) => {
  const { id, image, name, lastname, email, aboutMe, wantNotifications } =
    userInfo;
  const { country, address, city, province, postalCode } = userAddress;

  const transaction = await sequelize.transaction();

  try {
    const [outdatedUser, [outdatedAddress]] = await Promise.all([
      User.findByPk(id, { include: ['image', 'role'], transaction }),
      UserAddress.findOrCreate({ where: { user_id: id }, transaction }),
    ]);

    const updatedUserData = {
      name: name ?? outdatedUser.name,
      last_name: lastname ?? outdatedUser.lastname,
      email: email ?? outdatedUser.email,
      about: aboutMe ?? outdatedUser.aboutMe,
      want_notifications: wantNotifications ?? false,
    };

    const [outdatedUserImage] = await UserImage.findOrCreate({
      where: { id: outdatedUser.image_id ?? uuidv4() },
      transaction,
    });

    updatedUserData.image_id = outdatedUserImage.id;

    if (image) {
      const updatedUserImage = await outdatedUserImage.update(
        {
          image: await uploadImageToCloudinary(image, id),
        },
        { transaction }
      );
      updatedUserData.image_id = updatedUserImage.id;
    }

    if (email) {
      await admin.auth().updateUser(outdatedUser.firebase_id, { email });
    }

    const updatedUser = await outdatedUser.update(updatedUserData, {
      transaction,
    });
    const upatedImage = await User.findByPk(id, {
      attributes: [],
      include: ['image'],
      transaction,
    });

    const updatedAddress = await outdatedAddress.update(
      {
        country: country ?? outdatedAddress.country,
        address: address ?? outdatedAddress.address,
        city: city ?? outdatedAddress.city,
        province: province ?? outdatedAddress.province,
        postal_code: postalCode ?? outdatedAddress.postal_code,
      },
      { transaction }
    );

    await transaction.commit();

    const { firebase_id, image_id, role_id, ...updatedUserInfo } =
      updatedUser.toJSON();
    const {
      id: idAddress,
      user_id: idUser,
      ...restOfAddress
    } = updatedAddress.toJSON();

    return {
      ...convertKeysToCamelCase(updatedUserInfo),
      role: updatedUserInfo.role?.name,
      image: upatedImage?.image?.image,
      ...restOfAddress,
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const uploadImageToCloudinary = async (imageBuffer, userId) => {
  try {
    return new Promise((resolve, reject) => {
      const streamLoad = cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          public_id: `user/${userId}`,
        },
        (error, result) => {
          if (error) {
            reject(
              new Error(`Error uploading to Cloudinary: ${error.message}`)
            );
          } else {
            resolve(result.secure_url);
          }
        }
      );

      streamLoad.end(imageBuffer);
    });
  } catch (error) {
    throw new Error(`Error uploading to Cloudinary: ${error.message}`);
  }
};

module.exports = updateUserProfile;
