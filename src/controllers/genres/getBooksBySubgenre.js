const {
  PublishedBook,
  Book,
  BookSubgenre,
} = require('../../models');
const getPaginationData = require('../../utils/pagination');


const formatBooks = (books) =>
  books?.map((publishedBook) => {
    const book = publishedBook.book;
    const [cover, ...extra] = book.images?.map((image) => image.image);
    return {
      id: book.id,
      images: { cover, extra },
      title: book.title,
      author: book.author,
      publication_year: book.publication_year,
      editorial: book.editorial?.name,
      editorial_collection: book.editorial_collection?.name,
    };
  });

const getBooksBySubgenre = async (req, subgenreId) => {
  try {

    const{limit, offset, page} = getPaginationData(req,15);

    const subgenre = await BookSubgenre.findByPk(subgenreId, {
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

    if (!subgenre) {
      throw new Error('Subgenre not found');
    }

    const totalBooks = await Book.count({
      include:[
        {
        model: BookSubgenre,
        as:'subgenres', 
        where:{
          id: subgenreId
        }}
      ]
    })

    const publishedBooksBySubgenre = await PublishedBook.findAll({
      where: {
        book_id: subgenre.books?.map((book) => book.id),
      },
      include: [
        {
          model: Book,
          as: 'book',
          include: ['images', 'editorial', 'editorial_collection'],
        },
      ],
    });
    console.log(publishedBooksBySubgenre);

  const booksBySubgenre =  {
      id: subgenre.id,
      subgenre: subgenre.name,
      books: formatBooks(publishedBooksBySubgenre),
    }
    
    return {
      data: booksBySubgenre,
      paginated:{
        currentPage: page,
        itemsPerPage: limit,
        totalItems: totalBooks,  
        totalPages: Math.ceil(totalBooks / limit)

      }
    }
    ;
  } catch (error) {
    throw error;
  }
};

module.exports = getBooksBySubgenre;
