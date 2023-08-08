const cloudinary = require('@config/cloudinary');
const { BookImage } = require('@models');

const { v4: uuidv4 } = require('uuid');

const uploadImageToCloudinary = async (imageBuffer, newBookId) => {
  try {
    return new Promise((resolve, reject) => {
      const streamLoad = cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          public_id: `book/${newBookId}/${uuidv4()}`,
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

const uploadMultipleToCloudinary = async (imageList, bookId) => {
  const imageUploadPromiseList = imageList.map((image) =>
    uploadImageToCloudinary(image.buffer, bookId)
  );
  const imageUrlList = await Promise.all(imageUploadPromiseList);
  return imageUrlList;
};

const prepareImageEntries = (imageUrlList, bookId) => {
  return imageUrlList.map((imageUrl) => ({
    id: uuidv4(),
    book_id: bookId,
    image: imageUrl,
  }));
};

const createBookImages = async (bookInfo, newBookId) => {
  const imageUrlList = await uploadMultipleToCloudinary(
    bookInfo.images,
    newBookId
  );
  await BookImage.bulkCreate(prepareImageEntries(imageUrlList, newBookId));
};

module.exports = createBookImages;
