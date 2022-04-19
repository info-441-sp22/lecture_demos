import express from 'express';
import {promises as fs} from "fs";
var router = express.Router();

/* POST users listing. */
router.post('/', async function(req, res, next) {
  console.log(req.body)
  try{
    const newUser = new req.models.User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      favorite_ice_cream: req.body.favorite_ice_cream
    })

    await newUser.save()

    res.send('success');
  } catch(error){
    res.send("error info:" + error)
  }
});

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let allUsers = await req.models.User.find()
  res.json(allUsers);
});


export default router;
