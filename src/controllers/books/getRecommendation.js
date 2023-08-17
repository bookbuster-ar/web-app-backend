const { Book, BookFormat, BookFormatInterm, PublishedBook } = require('../../models');

const getRecommendation = async (format, pages, genres) => {
    let whereCondition;


    if(pages){ 
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
  }

  if(format){
    const nameFormat = await BookFormat.findOne({ where: { name: format } });

  if (!nameFormat) {
    throw new Error('Formato no encontrado');
  }

  const booksFormatInterm = await BookFormatInterm.findAll({
    where:{book_format_id: nameFormat.id},
    include: [
      {
        model: Book,
        as: 'book',
        include: [ 'images',
        {
            model: PublishedBook,
            as: 'published_book',
          },
        ],
      },
    ],
  });
  }

  if(genres){
      
  }
    
}

module.exports = getRecommendation;