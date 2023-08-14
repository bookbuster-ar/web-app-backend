const cloudinary = require('../../../../config/cloudinary');
const { BookImage } = require('../../../../models/index');

const { v4: uuidv4 } = require('uuid');

const uploadImageToCloudinary = async (imageBuffer, bookId) => {
  try {
    return new Promise((resolve, reject) => {
      const streamLoad = cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          public_id: `book/${bookId}/${uuidv4()}`,
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

const createBookImages = async (bookInfo) => {
  const imageUrlList = await uploadMultipleToCloudinary(
    [...bookInfo.images.cover, ...bookInfo.images.extra],
    bookInfo.id
  );
  await BookImage.bulkCreate(prepareImageEntries(imageUrlList, bookInfo.id));
};

const prepareImageEntries = (imageUrlList, bookId) => {
  return imageUrlList.map((imageUrl, index) => ({
    id: uuidv4(),
    book_id: bookId,
    image: imageUrl,
    is_cover: index === 0,
  }));
};

module.exports = createBookImages;
