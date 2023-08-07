const {
  Book,
  BookImage,
  BookDetail,
  Use,
  BookToReview,
} = require('../../models');
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('../../config/cloudinary');

const createBook = async (bookInfo) => {
  const bookId = uuidv4();

  // Upload images in parallel and then bulk create image entries
  const imageUrls = await uploadMultipleToCloudinary(bookInfo.images);
  const bookImagePromises = prepareImageEntries(imageUrls, bookId).map(
    (imageEntry) => BookImage.create(imageEntry)
  );

  // Grouping DB operations which can be performed in parallel
  const operations = [
    // For BookImage
    ...bookImagePromises,
    // For BookDetail
    BookDetail.create({
      id: uuidv4(),
      book_id: bookId,
      synopsis: bookInfo.synopsis,
      pages: bookInfo.pages,
      isbn: null,
      language: 'Español',
      size: bookInfo.size,
      price: bookInfo.price,
      subgenre: JSON.stringify(bookInfo.subgenres),
    }),
    // For BookToReview
    BookToReview.create({
      user_id: '85335cdd-1827-4c67-8f8c-095b3b201ca4',
      book_id: bookId,
    }),
    // For Book
    Book.create({
      id: bookId,
      editorial_id: bookInfo.editorial_id,
      editorial_collection: bookInfo.editorial_collection_id,
      title: bookInfo.title,
      author: bookInfo.author,
      publication_year: bookInfo.publication_year,
    }),
  ];

  // Wait for all operations to complete
  await Promise.all(operations);
  return { status: 201 };
};

const uploadImageToCloudinary = async (imageBuffer) => {
  try {
    const streamLoad = cloudinary.uploader.upload_stream({
      resource_type: 'image',
      folder: `book/${bookId}/`,
      public_id: uuidv4(),
    });

    streamLoad.end(imageBuffer);

    const result = await new Promise((resolve, reject) => {
      streamLoad.on('finish', resolve).on('error', reject);
    });

    return result.secure_url;
  } catch (error) {
    throw new Error('Error uploading to Cloudinary:', error.message);
  }
};
const uploadMultipleToCloudinary = async (imageBuffers) => {
  const uploadImages = imageBuffers.map(uploadImageToCloudinary);
  const imageUrls = await Promise.all(uploadImages);
  return imageUrls;
};

const prepareImageEntries = (imageUrls, bookId) => {
  return imageUrls?.map((imageUrl) => ({
    id: uuidv4(),
    book_id: bookId,
    image: imageUrl,
  }));
};

module.exports = createBook;
