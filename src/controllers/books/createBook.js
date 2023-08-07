const {
  Book,
  BookImage,
  BookDetail,
  BookToReview,
  Editorial,
  EditorialCollection,
} = require('../../models');

const { v4: uuidv4, validate } = require('uuid');
const cloudinary = require('../../config/cloudinary');

const createBook = async (bookInfo) => {
  const bookId = uuidv4();

  const bookToCreate = {
    id: bookId,
    title: bookInfo.title,
    author: bookInfo.author,
    publication_year: bookInfo.publication_year,
  };

  console.log('createBook - Editorial Name: ', bookInfo.editorial_name);
  const [editorialInstance, editorialWasCreated] = await Editorial.findOrCreate(
    {
      where: {
        id: bookInfo.editorial_id || uuidv4(), // Busca por el ID proporcionado en bookInfo.editorial_id
      },
      defaults: {
        id: uuidv4(), // Establece un nuevo UUID solo si se crea una nueva entidad
        name: bookInfo.editorial_name,
      },
    }
  );

  bookToCreate.editorial_id = editorialWasCreated
    ? editorialInstance.id
    : bookInfo.editorial_id;

  if (
    validate(bookInfo.editorial_collection_id) ||
    bookInfo.editorial_collection_name?.length > 0
  ) {
    const [collectionInstance, collectionWasCreated] =
      await EditorialCollection.findOrCreate({
        where: { id: bookInfo.editorial_collection_id || uuidv4() },
        defaults: {
          id: uuidv4(),
          editorial_id: editorialInstance.id,
          name: bookInfo.editorial_collection_name,
        },
      });

    bookToCreate.editorial_collection_id = collectionWasCreated
      ? collectionInstance.id
      : bookInfo.editorial_collection_id;
  }

  console.log('bookToCreate: ', bookToCreate);

  // Grouping DB operations which do NOT depend on Book
  await Book.create(bookToCreate);

  // Upload images in parallel and then bulk create image entries
  const imageUrls = await uploadMultipleToCloudinary(bookInfo.images, bookId);

  // Grouping DB operations which DO depend on Book
  const dependentOperations = [
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
      id: uuidv4(),
      review_status: false,
      user_id: '85335cdd-1827-4c67-8f8c-095b3b201ca4',
      book_id: bookId,
    }),
    // For BookImage
    BookImage.bulkCreate(prepareImageEntries(imageUrls, bookId)),
  ];

  // Wait for all operations to complete
  await Promise.all(dependentOperations);

  return { statusCode: 201 };
};

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

      streamLoad.end(imageBuffer.buffer);
    });
  } catch (error) {
    throw new Error(`Error uploading to Cloudinary: ${error.message}`);
  }
};
const uploadMultipleToCloudinary = async (imageBuffers, bookId) => {
  const uploadImages = imageBuffers.map((image) =>
    uploadImageToCloudinary(image, bookId)
  );
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
