const {Router} = require('express');
const shelvesRouter = Router();

const { handleGetShelves , handleAddBookToShelf , handleDeleteBookFromShelf , handleGetBooksOffTheShelf , handleCreateNewShelf , handleDeleteNewShelf , handleEditNameShelf} = require('../../handlers');
const verifySession = require('../../middlewares/verifySession');

shelvesRouter.get('/', verifySession, handleGetShelves);
shelvesRouter.get('/shelfbooks', verifySession, handleGetBooksOffTheShelf);
shelvesRouter.post('/addBookToShelf', verifySession, handleAddBookToShelf);
shelvesRouter.post('/createNewShelf', verifySession, handleCreateNewShelf);
shelvesRouter.put('/editNameShelf', verifySession, handleEditNameShelf);
shelvesRouter.delete('/deleteNewShelf', verifySession, handleDeleteNewShelf);
shelvesRouter.delete('/deleteBookFromShelf', verifySession, handleDeleteBookFromShelf);

module.exports = shelvesRouter;