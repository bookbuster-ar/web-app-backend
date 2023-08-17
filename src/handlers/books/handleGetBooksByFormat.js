const {getBooksByFormat} = require('../../controllers');

const handleGetBooksByFormat = async (req, res) => {
    try {

        const format = req.query.format;
        
        const books = await getBooksByFormat(format);

        return res.status(200).json(books);

    } catch (error) {

        res.status(500).json({ error: error.message });
        
    }
}

module.exports = handleGetBooksByFormat;