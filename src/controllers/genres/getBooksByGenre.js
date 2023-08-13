const { Book, BookGenre } = require('../../models/');
const getPaginationData = require('../../utils/pagination');

const formatBooks = (books) =>
  books.map((book) => {
    const [cover, ...extra] = book.images.map((image) => image.image);
    return {
      id: book.id,
      images: { cover, extra },
      title: book.title,
      author: book.author,
      publication_year: book.publication_year,
      editorial: book.editorial?.name ?? null,
      editorial_collection: book.editorial_collection?.name ?? null,
    };
  });

const getBooksByGenre = async (req,id) => {
  try {

    const{limit, offset, page} = getPaginationData(req, 15);

    const genreMatched = await BookGenre.findByPk(id, {
      include: [
        {
          model: Book,
          as: 'books',
          include: ['images', 'editorial', 'editorial_collection'],
          limit: limit,
          offset: offset
        },
      ],
    });

    if (!genreMatched) {
      throw new Error('Genre not found');
    }

    const totalBooks = await Book.count({
      include:[
        {
        model: BookGenre,
        as:'genres', 
        where:{
          id: genreMatched.id
        }}
      ]
    }) 

    const BooksByGenre =  {
      id: genreMatched.id,
      genre: genreMatched.name,
      books: formatBooks(genreMatched.books),
    }

return {
  data: BooksByGenre,
  paginated:{
      currentPage: page,
      itemsPerPage: limit,
      totalItems: totalBooks,
      totalPages: Math.ceil(totalBooks / limit)
    }
}

  } catch (error) {
    throw error;
  }
};

module.exports = getBooksByGenre;
