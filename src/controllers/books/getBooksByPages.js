const {Book, BookDetail, PublishedBook} = require('../../models');
const {Op} = require('sequelize');


const getBooksByPages = async (pages) => {
    let whereCondition;

    switch (pages) {
        case "0to50pages":
            whereCondition = { pages: { [Op.between]: [0, 50] } };
            break;
        case "50to100pages":
            whereCondition = { pages: { [Op.between]: [50, 100] } };
            break;
        case "100to200pages":
            whereCondition = { pages: { [Op.between]: [100, 200] } };
            break;
        case "Mayora200pages":
            whereCondition = { pages: { [Op.gt]: 200 } };
            break;
        default:
            throw new Error("Rango invalido");
    }

    const booksByPages =  await Book.findAll({
        attributes: ['id', 'title', 'author', 'publication_year'],
        include: [
            {
                model: BookDetail,
                as: 'detail',
                where: whereCondition,
            },
            {
                model: PublishedBook,
                as: 'published_book',
                attributes: ['id']
            }
        ]
    });

   

    return booksByPages;
}

module.exports = getBooksByPages;
