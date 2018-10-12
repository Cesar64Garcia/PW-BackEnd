var express = require('express');
var router = express.Router();
var series = require('../controllers/seriesController')

/* GET home page. */
router.route('/:id?')
  .get((req,res,next) => {
    let id = req.params.id
    series.getSeries(id, (err, data, message) => {
      if(err)
        res.status(err).json(data)
      else
        res.status(200).json(data)
    })
  })
  .post((req,res,next) => {
    series.postSerie(req.body.serie, (err, data) => {
      if(err)
        res.status(err).json(data)
      else
        res.status(201).json(data)
    })
  })
  .put((req,res,next) => {
    let id = req.params.id
    series.updateSerie(id,req.body.serie, (err, data) => {
      if(err)
        res.status(err).json(data)
      else
        res.status(204).json(data)
    })
  })
  .delete((req,res,next) => {
    let id = req.params.id
    series.deleteSerie(id, (err, data) => {
      if(err)
        res.status(err).json(data)
      else
        res.status(204).json(data)
    })
  })

module.exports = router;