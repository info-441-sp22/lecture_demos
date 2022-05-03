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


export default router