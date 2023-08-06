const Models = require('../models/index');
const sequelize = require('../config/database');

const cloudinary = require('../config/cloudinary');
const { v4: uuidv4 } = require('uuid');

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
          id: item['id'],
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
          language: item['detail']['language'],
          book_id: book.id,
        },
        { transaction }
      );

      if (genre) {
        await book.addGenre(genre, { transaction });
      }

      const rutaImagenLocal = `./book-images/${item['id']}/${item['id']}.jpg`;

      // Subimos la imagen a Cloudinary
      const result = await cloudinary.uploader.upload(rutaImagenLocal, {
        public_id: `book/${item['id']}/${uuidv4()}`,
      });

      if (result && result.url) {
        // Guardamos el URL de la imagen en la tabla book_image
        await Models.BookImage.create(
          {
            book_id: book.id,
            image: result.url,
          },
          { transaction }
        );
        console.log('Imagen subida y guardada con éxito:', result.url);
      } else {
        console.error('Error subiendo la imagen a Cloudinary.');
      }
    }

    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
}

module.exports = loadData;
