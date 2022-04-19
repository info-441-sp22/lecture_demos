import usersRouter from './controllers/users.js'

import express from 'express';
var router = express.Router();

router.use('/users', usersRouter)

export default router;
