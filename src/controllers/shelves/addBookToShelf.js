const {BookShelves , BookShelfCategory , BookShelfCategoryInterm } = require('../../models');

const addBookToShelf = async ( bookId , book_shelf_category_id) => {

    const categoryTodos = await BookShelfCategory.findOne({
        where: {
            name: 'Todos'
        }
    });
    
    const ShelfTodosID = categoryTodos.toJSON().id;
    console.log('DALEEEEEEEEEEEEEEEEEEE',ShelfTodosID);

    const addNewBookAtTheShelf = await BookShelfCategoryInterm.findOrCreate({
        where: {
            book_id: bookId,
            book_shelf_category_id: book_shelf_category_id,
        }
    });

    
    const todosShelf= await BookShelfCategoryInterm.findOrCreate({
        where: {
            book_id: bookId,
            book_shelf_category_id: ShelfTodosID,
        }
    })
    
    if (addNewBookAtTheShelf[1] === false && todosShelf[1] === false || addNewBookAtTheShelf[1] === false && todosShelf[1] === true) {
        throw new Error ('El libro ya se encuentra en el estante seleccionado');
    } else if(addNewBookAtTheShelf[1] === true && todosShelf[1] === false || addNewBookAtTheShelf[1] === true && todosShelf[1] === true){
        return addBookToShelf;
    }

       
}

module.exports = addBookToShelf;