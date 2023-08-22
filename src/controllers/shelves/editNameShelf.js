const {BookShelfCategory} = require('../../models');

const editNameShelf = async (name, shelfId) => {
    const shelf = await BookShelfCategory.update(
        { name: name },
        { 
            where: {
                id: shelfId
            } 
        } 
    );
    return shelf;
}

module.exports = editNameShelf;