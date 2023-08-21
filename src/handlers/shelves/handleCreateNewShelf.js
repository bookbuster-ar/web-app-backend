const {createNewShelf} = require('../../controllers');

const handleCreateNewShelf = async (req, res) => {
    try {
        const { name } = req.query;
        const book_shelves_id = req.query.book_shelves_id;
        const createdShelf = await createNewShelf({ name }, book_shelves_id);
        return res.status(201).json(createdShelf);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = handleCreateNewShelf