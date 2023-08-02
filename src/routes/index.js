const { Router } = require('express');
const router = Router();
const authRouter = require('./auth');
const bookRouter = require('./books');
const userRouter = require('./users');

router.use('/users', userRouter);
router.use('/books', bookRouter);
router.use('/auth', authRouter);

module.exports = router;
