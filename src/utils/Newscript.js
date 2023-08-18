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
        nationality_author: currentBook['nationality_author'],
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

      // Añadimos los formatos "nuevo", "digital" y "usado" a la tabla book_format_interm
      const formatsToAdd = ['nuevo', 'digital', 'usado', 'audiolibro'];

      for (const formatName of formatsToAdd) {
        try {
          const [bookFormatInstance] = await Models.BookFormat.findOrCreate({
            where: { name: formatName },
          });

          await Models.BookFormatInterm.findOrCreate({
            where: {
              book_id: createdBook.id,
              book_format_id: bookFormatInstance.id,
            },
          });
          if (!idFormat) {
            console.error(
              `No se encontró el formato con nombre: ${formatName}`
            );
            continue;
          }

          // await Models.BookFormatInterm.findOrCreate({
          //     where: {
          //         book_id: createdBook.id,
          //         book_format_id: idFormat.id
          //     }
          // });
        } catch (error) {
          console.error(
            `Error al agregar el formato '${formatName}' para el libro con ID: ${createdBook.id}. Detalles del error: ${error.message}`
          );
        }
      }

      const rutaImagenLocal = `./book-images/${currentBook['id']}/${currentBook['id']}.jpg`;

      // Aquí puedes descomentar y ajustar la parte relacionada con Cloudinary si lo necesitas.

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
