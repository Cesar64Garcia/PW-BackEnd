var express = require('express');
var router = express.Router();

/* GET home page. */
router.route('/')
  .get((req,res,next) => {
    res.json('Welcome to index GET')
  })
  .post((req,res,next) => {
    res.json('Welcome to series post')
  })
  .put((req,res,next) => {
    res.json('Welcome to series put')
  })
  .delete((req,res,next) => {
    res.json('Welcome to series delete')
  })


module.exports = router;
