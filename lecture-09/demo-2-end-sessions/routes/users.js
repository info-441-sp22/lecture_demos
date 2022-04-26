import express from 'express';
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let session = req.session
  if(session.userid){
    res.send('respond with a resource for the user: ' + session.userid);
  } else {
    res.send('Error: You must be logged in to see this information')
  }
  
});

router.post("/login", function(req, res, next) {
  let session = req.session
  console.log("session at start of login:", session)

  if(session.userid){
    res.send("Error: You are already logged in as " + session.userid)
    return
  }

  //check username and password
  if(req.body.username == "kylethayer" && req.body.password == "asdasd"){
    //start a session
    session.userid = "kylethayer"
    console.log("session after login:", session)
    res.send("you logged in")
  } else if(req.body.username == "anotheruser" && req.body.password == "pwd"){
    // start a session
    session.userid = "anotheruser"
    console.log("session after login:", session)
    res.send("you logged in")
  }else{
    //not start session
    console.log("session after failed login:", session)
    res.send("wrong login info")
  }

router.post("/logout", function(req, res, next) {
  req.session.destroy()
  res.send("you are logged out")
})
  
  
})

export default router;
