const { Book, BookDetail, PublishedBook } = require('../../models/index');

const getBookDetail = async (id) => {
  return BookDetail.findOne({ where: { book_id: id } });
};

const getBasicInfoOfBook = async (id) => {
  return Book.findByPk(id, {
    include: ['images', 'editorial', 'editorial_collection', 'genres'],
  });
};

const getBookById = async (id) => {
  const publishedBook = await PublishedBook.findByPk(id);
  const [bookBasicInfo, bookDetail] = await Promise.all([
    getBasicInfoOfBook(publishedBook.toJSON().book_id),
    getBookDetail(publishedBook.toJSON().book_id),
  ]);

  const completeBookInfo = {
    ...bookBasicInfo.toJSON(),
    ...bookDetail.toJSON(),
  };

  const cover = completeBookInfo.images.find(
    (image) => image.is_cover === true
  );

  const extra = completeBookInfo.images
    .filter((image) => image.is_cover !== true)
    .map((image) => image.image);

  return {
    id: id,
    title: completeBookInfo.title,
    author: completeBookInfo.author,
    publication_year: completeBookInfo.publication_year,
    images: { cover: cover?.image, extra },
    editorial: completeBookInfo.editorial.name,
    editorial_collection: completeBookInfo.editorial_collection.name,
    genres: completeBookInfo.genres.map((genre) => genre.name),
    subgenres: completeBookInfo.subgenre,
    synopsis: completeBookInfo.synopsis,
    pages: completeBookInfo.pages,
    ibsn: completeBookInfo.isbn,
    language: completeBookInfo.language,
    size: completeBookInfo.size,
    price: completeBookInfo.price,
  };
};

module.exports = getBookById;
