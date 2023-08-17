const {BookFormat , BookFormatInterm} = require('../../models');
const registerBookFormat = async (book_id, format) => {
    
    const idFormat = await BookFormat.findOne({
        where: { name: format }
    });

    const register = await BookFormatInterm.findOrCreate({ where: { book_id: book_id, book_format_id: idFormat.id } });

    return register

};

module.exports = registerBookFormat;
