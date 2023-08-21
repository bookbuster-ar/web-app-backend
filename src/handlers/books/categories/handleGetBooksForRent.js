const {getBooksForRent} = require('../../../controllers')
const handleGetBooksFoRent = async (req, res) => {
try {
    const booksForRent = await getBooksForRent(req);
    
    
    if(!booksForRent.data.length){
        return res.status(404).json({error: 'No hay libros disponibles'})
    }
    res.status(200).json(booksForRent);

    
} catch (error) {
    res.status(500).json({ error: error.message });
}
    
};

module.exports = handleGetBooksFoRent;