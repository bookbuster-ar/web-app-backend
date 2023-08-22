const {getShelfWithBooks} = require('../../controllers');

const handleGetShelfWithBooks= async (req, res) => {
   try {
    const userid = req.headers.userid;
    const shelf = await getShelfWithBooks(userid);
    res.status(200).json(shelf);
   } catch (error) {
      res.status(500).json({ error: error.message });
    
   } 
}

module.exports = handleGetShelfWithBooks;