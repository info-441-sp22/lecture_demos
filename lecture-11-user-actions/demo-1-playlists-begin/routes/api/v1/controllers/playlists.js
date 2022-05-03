import express from 'express'
var router = express.Router()

router.get('/', async(req, res, next) => {
    //get info from request
    let userId = req.query.userId

    // load playlists from the give user
    let userPlaylists = await req.models.Playlist.find({user: userId})
    
    // return the json of the info
    res.json(userPlaylists)
})

router.post('/', async (req, res, next) => {
    // get info from request
    let title = req.body.title
    let songs = req.body.songs
    let userId = req.body.userId

    // create playlist object
    let newPlaylist = new req.models.Playlist({
        title: title,
        songs: songs,
        user: userId
    })

    // save to the database
    await newPlaylist.save()

    res.json({status: "success"})
})


export default router