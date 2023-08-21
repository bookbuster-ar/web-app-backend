const { Book , BookShelfCategory , BookShelfCategoryInterm} = require('../../models')

const getBooksOffTheShelf = async (book_shelf_category_id) => {

    const shelfBooks = await BookShelfCategory.findOne({
        where: {
            id: book_shelf_category_id
        },
        include: [{
            model: Book,
            as: 'books',
            include: ['images', 'editorial', 'editorial_collection'],
        }]
    });

    const books = shelfBooks.books?.map((field) => {
        const coverImage = field.images && field.images.length > 0 ? field.images[0].image : null;
        const extraImages = field.images && field.images.length > 1 ? field.images.slice(1).map(img => img.image) : [];
        
        return {
            id: field.id,
            images: { cover: coverImage, extra: extraImages },
            title: field.title,
            author: field.author,
            author_nationality: field.author_nationality,
            publication_year: field.publication_year,
            editorial_collection: field.editorial_collection ? field.editorial_collection.name : '',
            editorial: field.editorial ? field.editorial.name : '',
        };
    });

    return books;
}

module.exports = getBooksOffTheShelf;