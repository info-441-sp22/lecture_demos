import express from 'express';
import dessertRouter from './menusections/desserts.js';
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('this is the menu');
});

router.use('/dessert', dessertRouter)

export default router;