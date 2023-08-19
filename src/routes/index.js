const { Router } = require('express');
const router = Router();

const authRouter = require('./auth');
const bookRouter = require('./books');
const userRouter = require('./users');
const genresRouter = require('./genres');
const editorialRouter = require('./editorial');
const paymentRouter = require('./payment');
const stockRouter = require('./stock');
const adminRouter = require('./admin');

router.use('/users', userRouter);
router.use('/books', bookRouter);
router.use('/auth', authRouter);
router.use('/genres', genresRouter);
router.use('/editorials', editorialRouter);
router.use('/payment', paymentRouter);
router.use('/stock', stockRouter);
router.use('/admin', adminRouter);

module.exports = router;
