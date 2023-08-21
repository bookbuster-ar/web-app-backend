const {BookShelfCategoryInterm , BookShelfCategory} = require('../../models');

const deleteBookFromShelf = async (bookId, book_shelf_category_id) => {

    const categoryTodos = await BookShelfCategory.findOne({
        where: {
            name: 'Todos'
        }
    });
    
    const ShelfTodosID = categoryTodos.toJSON().id;
    console.log('DALEEEEEEEEEEEEEEEEEEE',ShelfTodosID);
    
    const deleteBookTodo= await BookShelfCategoryInterm.destroy({
        where: {
            book_id: bookId,
            book_shelf_category_id: ShelfTodosID
        }
    })

    const deletedBook = await BookShelfCategoryInterm.destroy({
        where: {
            book_id: bookId,
            book_shelf_category_id: book_shelf_category_id
        }
    });

    if(deletedBook === 0 && deleteBookTodo === 0){
        throw new Error ('El libro no se encuentra en el estante seleccionado');        
    }else if(deletedBook === 1 && deleteBookTodo === 1){
        return 1;
    }

       

}

module.exports = deleteBookFromShelf;