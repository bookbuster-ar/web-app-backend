const { Router } = require('express');
const shelvesRouter = Router();

const { handleGetShelves , handleGetShelfWithBooks, handleAddBookToShelf , handleDeleteBookFromShelf , handleGetBooksOffTheShelf , handleCreateNewShelf , handleDeleteNewShelf , handleEditNameShelf} = require('../../handlers');
const verifySession = require('../../middlewares/verifySession');

shelvesRouter.get('/', verifySession, handleGetShelves);
shelvesRouter.get('/shelfbooks', verifySession, handleGetBooksOfTheShelf);
shelvesRouter.post('/addBookToShelf', verifySession, handleAddBookToShelf);
shelvesRouter.post('/createNewShelf', verifySession, handleCreateNewShelf);
shelvesRouter.put('/editNameShelf', verifySession, handleEditNameShelf);
shelvesRouter.delete('/deleteShelf', verifySession, handleDeleteNewShelf);
shelvesRouter.delete('/deleteBookFromShelf', verifySession, handleDeleteBookFromShelf);
shelvesRouter.get('/shelfWithBooks',handleGetShelfWithBooks )

module.exports = shelvesRouter;
