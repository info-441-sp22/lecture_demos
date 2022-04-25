import express from 'express';
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/login", function(req, res, next) {
  //check username and password
  if(req.body.username == "kylethayer" && req.body.password == "asdasd"){
    //TODO: start a session
    res.send("you logged in")
  } else{
    //not start session
    res.send("wrong login info")
  }

  
})

export default router;
