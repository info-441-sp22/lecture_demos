import express from 'express';
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource, by the way, req.testValue=' + req.testValue);
});

export default router;
