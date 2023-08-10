const {PublishedBook, Book, BookSubgenre} = require('../models');

const getSubgenresByBook = async (bookId) => {

    try {
        const subgenres = await PublishedBook.findByPk(bookId , {
            include : [{model: Book , as:"book" , include:[
                {model: BookSubgenre , as:"subgenres"}
            ]}]
        });

        if(!subgenres) {
            throw new Error('No tiene subgeneros');
        }

        return book.subgenres;        

    } catch (error) {
        throw error;        
    }
    
};

module.exports = getSubgenresByBook;