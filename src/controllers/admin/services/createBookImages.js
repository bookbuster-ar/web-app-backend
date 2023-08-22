const cloudinary = require('../../../config/cloudinary');
const { BookImage } = require('../../../models');
const { v4: uuidv4 } = require('uuid');
const { Op } = require('sequelize');

const uploadImageToCloudinary = async (imageBuffer, bookId, propertyName) => {
  const uploadToCloud = (buffer) => {
    return new Promise((resolve, reject) => {
      const streamLoad = cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          public_id: `book/${bookId}/${propertyName}`,
        },
        (error, result) => {
          if (error)
            reject(
              new Error(`Error uploading to Cloudinary: ${error.message}`)
            );
          else resolve(result.secure_url);
        }
      );
      streamLoad.end(buffer);
    });
  };

  return await uploadToCloud(imageBuffer);
};

const uploadMultipleToCloudinary = async (imagesObject, bookId) => {
  const imageUploadPromiseList = [];

  for (const propertyName in imagesObject) {
    if (Object.prototype.hasOwnProperty.call(imagesObject, propertyName)) {
      const imageArray = imagesObject[propertyName];
      const imageUrlList = await uploadImageArrayToCloudinary(
        imageArray,
        bookId,
        propertyName
      );
      imageUploadPromiseList.push(...imageUrlList);
    }
  }

  return imageUploadPromiseList;
};

const uploadImageArrayToCloudinary = async (
  imageArray,
  bookId,
  propertyName
) => {
  const imageUrlList = [];

  for (const image of imageArray) {
    const imageUrl = await uploadImageToCloudinary(
      image.buffer,
      bookId,
      propertyName
    );
    imageUrlList.push({ url: imageUrl, propertyName });
  }

  return imageUrlList;
};

const destroySpecificImages = async (bookId, propertyName, transaction) => {
  await BookImage.destroy({
    where: {
      book_id: bookId,
      image: {
        [Op.like]: `%book/${bookId}/${propertyName}%`,
      },
    },
    transaction: transaction,
  });
};

const createBookImages = async (bookInfo, transaction) => {
  try {
    const imageUrlList = await uploadMultipleToCloudinary(
      bookInfo.images,
      bookInfo.id
    );

    for (const imageData of imageUrlList) {
      await destroySpecificImages(
        bookInfo.id,
        imageData.propertyName,
        transaction
      );
    }

    await BookImage.bulkCreate(prepareImageEntries(imageUrlList, bookInfo.id), {
      transaction: transaction,
    });
  } catch (error) {
    throw error;
  }
};

const prepareImageEntries = (imageUrlList, bookId) => {
  return imageUrlList.map((imageData) => ({
    id: uuidv4(),
    book_id: bookId,
    image: imageData.url,
    is_cover: imageData.propertyName === 'cover',
  }));
};

module.exports = createBookImages;
