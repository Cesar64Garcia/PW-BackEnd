var express = require('express');
var router = express.Router();
var series = require('../controllers/seriesController')

/* GET home page. */
router.route('/:id?')
  .get((req,res,next) => {
    let id = req.params.id
    res.json(series.getSeries(id))
  })
  .post((req,res,next) => {
    res.json(series.postSerie(req.body.serie))
  })
  .put((req,res,next) => {
    let id = req.params.id
    res.json(series.updateSerie(id,req.body.serie))
  })
  .delete((req,res,next) => {
    res.json(series.deleteSerie(id))
  })

module.exports = router;