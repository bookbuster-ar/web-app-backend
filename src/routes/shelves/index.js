const {Router} = require('express');
const shelvesRouter = Router();

const { handleGetShelves , handleAddBookToShelf , handleDeleteBookFromShelf , handleGetBooksOffTheShelf , handleCreateNewShelf , handleDeleteNewShelf } = require('../../handlers');
const verifySession = require('../../middlewares/verifySession');

shelvesRouter.get('/', verifySession, handleGetShelves);
shelvesRouter.get('/shelfbooks', verifySession, handleGetBooksOffTheShelf);
shelvesRouter.post('/addBookToShelf', verifySession, handleAddBookToShelf);
shelvesRouter.post('/createNewShelf', verifySession, handleCreateNewShelf);
shelvesRouter.delete('/deleteNewShelf', verifySession, handleDeleteNewShelf);
shelvesRouter.delete('/deleteBookFromShelf', verifySession, handleDeleteBookFromShelf);

module.exports = shelvesRouter;