import express from 'express';
import {promises as fs} from "fs";
var router = express.Router();

/* POST users listing. */
router.post('/addUserData', async function(req, res, next) {
  console.log(req.body)
  
  await fs.writeFile("data/userData.json", JSON.stringify(req.body))

  res.send('success');
});

/* GET users listing. */
router.get('/getUserData', async function(req, res, next) {
  let userInfo = await fs.readFile("data/userData.json")
  res.type("json")
  res.send(userInfo);
});


export default router;
