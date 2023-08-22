const {BookShelfCategory, BookShelves} = require('../../models');

const deleteShelf = async (shelfId) => {
    
const deletedShelf = await BookShelfCategory.destroy({
    where: {
        id: shelfId
    }
});

if(deletedShelf === 1){
    return 1;
} else {
    throw new Error ('El estante ya fue eliminado');
}
};

module.exports = deleteShelf;
