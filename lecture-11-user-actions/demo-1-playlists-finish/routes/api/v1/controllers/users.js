import express from 'express'
var router = express.Router();

router.get("/", async (req, res, next) => {
    let allUsers = await req.models.User.find()
    res.json(allUsers)
})


router.post("/", async (req, res, next) => {
    let username = req.body.username

    let newUser = new req.models.User({
        username: username
    })

    await newUser.save()

    res.json({status: 'success'})
})

router.delete("/", async (req, res, next) =>{
    // get info from request
    let userId = req.body.userId

    // delete the user, but first delete playlists for it
    await req.models.Playlist.deleteMany({user: userId})
    await req.models.User.deleteOne({_id: userId})

    res.json({status: "success"})
})

router.post('/bands', async (req, res, next) => {
    // get info from the request
    let userId = req.body.userId
    let bandToAdd = req.body.band
    
    // find the right user
    let user = await req.models.User.findById(userId)

    // update the favorite bands
    if(!user.favorite_bands.includes(bandToAdd)){
        user.favorite_bands.push(bandToAdd)
    }

    // save
    await user.save()
    
    res.send({status:'success'})
})


export default router