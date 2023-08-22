const app = require('./src/app');
const sequelize = require('./src/config/database');

const Models = require('./src/models');
require('./src/models/associations');

const bookDb = require('./src/utils/data');

const uploadBooks = async (bookDb) => {
  const transaction = await sequelize.transaction();
  try {
      // 1. Crear 4 usuarios
    const usersData = [
      {name: "Maria", last_name: "Cardenas", email: "mcelestecrnl@gmail.com", is_inactive: false, is_blocked: false, subscription: true},
      {name: "Matias", last_name: "Fenoglio", email: "matifeno@hotmail.com", is_inactive: false, is_blocked: false, subscription: true},
      {name: "Celeste", last_name: "Coronel", email: "cele_07_c@email.com", is_inactive: false, is_blocked: false, subscription: true},
      {name: "Benjamin", last_name: "Coronel", email: "benja_coro@email.com", is_inactive: false, is_blocked: false, subscription: true}
    ];
    
    const createdUsers = await Promise.all(usersData.map(userData => Models.User.create(userData)));
    
    // 2. Asignar una BookShelves a cada usuario
    const createdBookShelves = await Promise.all(createdUsers.map(user => Models.BookShelves.create({user_id: user.id})));
    
    // 3. Crear BookShelfCategory para cada BookShelves
    const shelfCategories = ["Todos", "Leer", "Actualmente Leyendo", "Quiero leer"];
    
    for (const bookShelf of createdBookShelves) {
      for (const category of shelfCategories) {
        await Models.BookShelfCategory.create({name: category, book_shelves_id: bookShelf.id});
      }
    }

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
        author_nationality: currentBook['author_nationality'],
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
      const publishedBook = await createdBook.createPublished_book();
      await genre.addSubgenres(subgenresToAdd);

      for (const format of currentBook['format']) {
        const [bookFormatInstance] = await Models.BookFormat.findOrCreate({
          where: { name: format.name }
        });

        const [bookFormatInterm] = await Models.BookFormatInterm.findOrCreate({
          where: {
            book_id: createdBook.id,
            book_format_id: bookFormatInstance.id
          }
        });

        await Models.PublishedBookPrice.create({
          published_book_id: publishedBook.id,
          price: format.price,
          book_format_id: bookFormatInstance.id
        });

        await Models.SaleStock.create({
          book_format_interm_id: bookFormatInterm.id,
        });
      }

      const rutaImagenLocal = `./book-images/${currentBook['id']}/${currentBook['id']}.jpg`;
      // Continúa con la lógica relacionada con la carga de imágenes, si es necesario...

    }
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};


app.listen(3001, async () => {
  try {
    await sequelize.sync({ force: false, logging: false });
    //await uploadBooks(bookDb);
  } catch (error) {
    console.log(error.message);
  }
});
