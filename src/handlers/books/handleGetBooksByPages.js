const {getBooksByPages} = require('../../controllers')

const handleGetBooksByPages = async(req, res)=>{
    try {

        const pages = req.query.pages; 

        const books = await getBooksByPages(pages);     
        
        if(!books){
            return res.status(404).json({ message: 'No se encontraron resultados' });
        } else {
            return res.status(200).json(books);
        }
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }

}

module.exports = handleGetBooksByPages;