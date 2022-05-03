import express from 'express'
var router = express.Router()

import usersRouter from './controllers/users.js'

router.use('/users', usersRouter)


export default router;