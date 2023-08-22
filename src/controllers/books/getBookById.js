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
  try {
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

    //*** libros recomendados ****

    const genres = completeBookInfo.genres.map((genre) => genre.name);

    const books = await Book.findAll({
      include: [
        'images',
        'genres',
        { model: PublishedBook, as: 'published_book', attributes: ['id'] },
      ],
    });

    const librosConGeneroBuscado = books.filter((libro) => {
      // Verificar si el género buscado está presente en el array de géneros del libro
      return (
        libro.genres.some((genero) => genero.name == genres.join('')) &&
        libro.title != completeBookInfo.title
      );
    });

    const librosRecomendados = [];

    librosConGeneroBuscado.map((libro) =>
      librosRecomendados.push({
        id: libro.published_book.id,
        title: libro.title,
        author: libro.author,
        images: { cover: cover?.image || null },
      })
    );
    console.log(completeBookInfo);
    // *** ***
    return {
      id: publishedBook.id,
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
      recomendedBooks: [...librosRecomendados],
    };
  } catch (error) {
    throw error;
  }
};

module.exports = getBookById;
