const { Router } = require('express');
const shelvesRouter = Router();

const {
  handleGetShelves,
  handleGetShelfWithBooks,
  handleAddBookToShelf,
  handleDeleteBookFromShelf,
  handleGetBooksOfTheShelf,
  handleCreateNewShelf,
  handleDeleteShelf,
  handleEditNameShelf,
} = require('../../handlers');
const verifySession = require('../../middlewares/verifySession');

shelvesRouter.get('/', verifySession, handleGetShelves);
shelvesRouter.get('/shelfbooks', verifySession, handleGetBooksOfTheShelf);
shelvesRouter.post('/addBookToShelf', verifySession, handleAddBookToShelf);
shelvesRouter.post('/createNewShelf', verifySession, handleCreateNewShelf);
shelvesRouter.put('/editNameShelf', verifySession, handleEditNameShelf);
shelvesRouter.delete('/deleteShelf', verifySession, handleDeleteShelf);
shelvesRouter.delete(
  '/deleteBookFromShelf',
  verifySession,
  handleDeleteBookFromShelf
);
shelvesRouter.get('/shelfWithBooks', verifySession, handleGetShelfWithBooks);

module.exports = shelvesRouter;
