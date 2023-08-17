const app = require('./src/app');
const sequelize = require('./src/config/database');
const { v4: uuidv4 } = require('uuid');


const Models = require('./src/models');
require('./src/models/associations');

const bookDb = require('./src/utils/data');

const uploadBooks = async (bookDb) => {
  const transaction = await sequelize.transaction();
  try {
    for (let i = 0; i < bookDb.length; i++) {
      const currentBook = bookDb[i];

      const [editorial] = await Models.Editorial.findOrCreate({
        where: { name: currentBook['detail']['editorial'] },
      });

      const [collection] = await Models.EditorialCollection.findOrCreate({
        where: { name: currentBook['detail']['collection'] },
        defaults: {
          editorial_id: editorial.id,
        },
      });

      await editorial.createEditorial_collection(collection);

      const createdBook = await Models.Book.create({
        id: currentBook['id'],
        title: currentBook['title'],
        author: currentBook['author'],
        publication_year: currentBook['publication_year'],
      });

      await Models.BookDetail.create({
        synopsis: currentBook['detail']['synopsis'],
        price: currentBook['detail']['price'],
        pages: currentBook['detail']['pages'],
        isbn: currentBook['detail']['isbn'],
        size: currentBook['detail']['size'],
        language: currentBook['detail']['language'],
        book_id: createdBook.id,
      });

      const [genre] = await Models.BookGenre.findOrCreate({
        where: { name: currentBook['genre'] },
      });

      const subgenresToAdd = [];
      for (const subgenreName of currentBook['detail']['subgenre']) {
        const [subgenreInstance] = await Models.BookSubgenre.findOrCreate({
          where: { name: subgenreName },
        });
        subgenresToAdd.push(subgenreInstance);
      }
      await createdBook.setEditorial(editorial);
      await createdBook.setEditorial_collection(collection);
      await createdBook.setGenres(genre);
      await createdBook.addSubgenres(subgenresToAdd);
      await createdBook.createPublished_book();
      await genre.addSubgenres(subgenresToAdd);

      const rutaImagenLocal = `./book-images/${currentBook['id']}/${currentBook['id']}.jpg`;

      // // Subimos la imagen a Cloudinary
      // const result = await cloudinary.uploader.upload(rutaImagenLocal, {
      //   public_id: `book/${currentBook['id']}/${uuidv4()}`,
      // });

      // if (result && result.url) {
      //   // Guardamos el URL de la imagen en la tabla book_image
      //   await Models.BookImage.create({
      //     book_id: createdBook.id,
      //     image: result.url,
      //     is_cover: true,
      //   });
      //   console.log('Imagen subida y guardada con Ã©xito:', result.url);
      // } else {
      //   console.error('Error subiendo la imagen a Cloudinary.');
      // }

      // const properties = Object.getOwnPropertyNames(
      //   Object.getPrototypeOf(editorial)
      // );

      // properties.forEach((property, index) => {
      //   console.log(`Property ${index + 1}: ${property}`);
      // });
    }

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const uploadFormats = async () => {
  try {
      const formats = [
          { id: uuidv4(), name: 'nuevo' },
          { id: uuidv4(), name: 'usado' },
          { id: uuidv4(), name: 'digital' },
          { id: uuidv4(), name: 'audiolibro' }
      ];

      // Insertar todos los formatos en la base de datos
      await Models.BookFormat.bulkCreate(formats);

      console.log('Formatos cargados exitosamente');
  } catch (error) {
      console.error('Error al cargar los formatos:', error.message);
  }
};


app.listen(3001, async () => {
  try {
    await sequelize.sync({ force: false, logging: false });
    await uploadBooks(bookDb);
    await uploadFormats();
  } catch (error) {
    console.log(error.message);
  }
});
