const {getBooksByPages} = require('../../controllers')

const handleGetBooksByPages = async(req, res)=>{
    try {

        const pages = req.query.pages; 

        const books = await getBooksByPages(pages);        
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }

}

module.exports = handleGetBooksByPages;