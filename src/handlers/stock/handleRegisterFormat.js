const { registerBookFormat } = require('../../controllers');

const handleRegisterFormat= async (req, res) => {
    try {
        const {book_id, format} = req.body[0];

        const register = await registerBookFormat(book_id, format);

        return res.status(200).json(register);
        
    } catch (error) {
        
        res.status(500).json({ error: error.message });
        
    }
}

module.exports = handleRegisterFormat;