import express from 'express'
var router = express.Router()

import usersRouter from './controllers/users.js'
import playlistsRouter from './controllers/playlists.js'

router.use('/users', usersRouter)
router.use('/playlists', playlistsRouter)

export default router;