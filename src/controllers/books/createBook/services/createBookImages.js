const cloudinary = require('../../../../config/cloudinary');
const { BookImage } = require('../../../../models/index');
const { v4: uuidv4 } = require('uuid');

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

const createBookImages = async (bookInfo) => {
  const imageUrlList = await uploadMultipleToCloudinary(
    bookInfo.images,
    bookInfo.id
  );
  await BookImage.bulkCreate(prepareImageEntries(imageUrlList, bookInfo.id));
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
