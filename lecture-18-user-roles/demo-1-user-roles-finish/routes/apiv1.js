import express from 'express';
var router = express.Router();

/* GET users listing. */
router.get('/users/me', (req, res) => {
    let session = req.session
    if(session.isAuthenticated){
      res.json({
          status: "logged in",
          name: session.account.name,
          username: session.account.username
      });
    } else {
      res.json({status: "not logged in (anonymous)"})
    }
});


/* GET users listing. */
router.get('/comments', async (req, res) => {
    res.json(await req.models.Comment.find())
});

router.post('/comments', async (req, res) => {
    let newComment = new req.models.Comment({
        username: req.session.isAuthenticated ? 
            req.session.account.username : 
            "anonymous",
        comment: req.body.comment
    })
    await newComment.save()
    res.json({status: "success"})
});


router.delete("/comments", async (req, res, next) =>{
    if(req.session.isAuthenticated){
        let commentId = req.body.commentId
        await req.models.Comment.deleteOne({_id: commentId})
        res.json({status: "success"})
    } else {
        res.json({status: "Error: Not logged in"})
    }
})

export default router;