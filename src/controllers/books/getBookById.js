const { Book, BookDetail } = require('@models');

const getBookDetail = async (id) => {
  return BookDetail.findOne({ where: { book_id: id } });
};

const getBasicInfoOfBook = async (id) => {
  return Book.findByPk(id, {
    include: ['images', 'editorial', 'editorial_collection', 'genres'],
  });
};

const getBookById = async (id) => {
  const [bookBasicInfo, bookDetail] = await Promise.all([
    getBasicInfoOfBook(id),
    getBookDetail(id),
  ]);

  const completeBookInfo = {
    ...bookBasicInfo.toJSON(),
    ...bookDetail.toJSON(),
  };
  const [cover, ...extra] = completeBookInfo.images.map((image) => image.image);

  return {
    id: completeBookInfo.id,
    title: completeBookInfo.title,
    author: completeBookInfo.author,
    publication_year: completeBookInfo.publication_year,
    images: { cover, extra },
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
