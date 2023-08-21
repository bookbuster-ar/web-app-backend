const {BookShelfCategory ,  BookShelves} = require('../../models');
const createNewShelf =async({name}, book_shelves_id)=>{

    const newShelf = await BookShelfCategory.create({
        name,
        book_shelves_id: book_shelves_id,
        created:true
    });



    return newShelf.toJSON();
}

module.exports = createNewShelf;