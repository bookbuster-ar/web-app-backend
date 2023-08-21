const {BookShelfCategory} = require('../../models');

const editNameShelf = async (name, shelfId) => {

    const shelf = await BookShelfCategory.update({
        where: {
            id: shelfId
        },
        name: name
    })

    return shelf;
}

module.exports = editNameShelf;