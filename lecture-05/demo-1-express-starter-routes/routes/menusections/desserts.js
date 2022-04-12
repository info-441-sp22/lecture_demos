import express from 'express';
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('The desserts today are cake, cookies, or ice cream');
});

export default router;