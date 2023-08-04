const Models = require('../models/index');
const sequelize = require('../config/database');

async function loadData(data) {
  const transaction = await sequelize.transaction();

  try {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];

      let genre = null;
      let editorial = null;
      let editorialCollection = null;

      if (item['genre']) {
        [genre] = await Models.BookGenre.findOrCreate({
          where: { name: item['genre'] },
          transaction,
        });
      }

      if (item['detail'] && item['detail']['editorial']) {
        [editorial] = await Models.Editorial.findOrCreate({
          where: { name: item['detail']['editorial'] },
          transaction,
        });
      }

      if (item['detail'] && item['detail']['collection']) {
        [editorialCollection] = await Models.EditorialCollection.findOrCreate({
          where: { name: item['detail']['collection'] },
          transaction,
        });
      }

      // Después, creamos el libro y los detalles del libro.
      const book = await Models.Book.create(
        {
          title: item['title'],
          author: item['author'],
          publication_year: item['publication_year'],
          editorial_id: editorial ? editorial.id : null,
          editorial_collection_id: editorialCollection
            ? editorialCollection.id
            : null,
        },
        { transaction }
      );

      await Models.BookDetail.create(
        {
          synopsis: item['detail']['synopsis'],
          price: item['detail']['price'],
          subgenre: item['detail']['subgenre'],
          pages: item['detail']['pages'],
          isbn: item['detail']['isbn'],
          size: item['detail']['size'],
          book_id: book.id,
        },
        { transaction }
      );

      // Finalmente, añadimos la relación de muchos a muchos entre el libro y el género.
      if (genre) {
        await book.addGenre(genre, { transaction });
      }
    }

    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw err; // aquí puedes manejar el error como prefieras
  }
}

module.exports = loadData;
