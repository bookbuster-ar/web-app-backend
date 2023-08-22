const {BookShelfCategory, BookShelves} = require('../../models');

const deleteNewShelf = async (shelfId) => {
    
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

module.exports = deleteNewShelf;
