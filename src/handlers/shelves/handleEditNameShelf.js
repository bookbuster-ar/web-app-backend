const { editNameShelf } = require('../../controllers');

const handleEditNameShelf= async (req, res) => {
    try {
        const name = req.query.name;
        const shelfId = req.query.shelfId;
        const editName = await editNameShelf(name , shelfId);
        return res.status(200).json(editName);
    } catch (error) {
        res.status(500).json({ error: error.message });
            
    }
}

module.exports = handleEditNameShelf;