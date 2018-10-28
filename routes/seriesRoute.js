var express = require('express');
var router = express.Router();
var series = require('../controllers/seriesController');
var cache = require('express-redis-cache')();

cache.on('error', function (error) {
  console.log('Cache error!' + error);
  return
});


/* GET home page. */
router.get('/', cache.route({ expire: 60, name: 'getAll' }), (req, res, next) => {
  series.getSeries(null, (err, data) => {
    if (err)
      res.status(err).json(data)
    else
      res.status(200).json(data)
  })
});

router.get('/:id',
  (req, res, next) => {
    // set cache name
    res.express_redis_cache_name = 'getOne-' + req.params.id;
    next();
  },
  cache.route(60),
  (req, res, next) => {
    const { id } = req.params
    series.getSeries(id, (err, data) => {
      if (err)
        res.status(err).json(data)
      else
        res.status(200).json(data)
    })
  }
);

router.post('/', (req, res, next) => {
  series.postSerie(req.body.serie, (err, data) => {
    if (err)
      res.status(err).json(data)
    else
      cache.del('getAll', (err, del) => {
        res.status(201).json(data)
      });
  })
});

router.put('/:id', (req, res, next) => {
  const { id } = req.params
  series.updateSerie(id, req.body.serie, (err, data) => {
    if (err)
      res.status(err).json(data)
    else
      cache.del('getAll', (err, del) => {
        cache.del('getOne-' + id, (err, del) => {
          res.status(204).json(data)
        })
      });
  })
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params
  series.deleteSerie(id, (err, data) => {
    if (err)
      res.status(err).json(data)
    else
      cache.del('getAll', (err, del) => {
        cache.del('getOne-' + id, (err, del) => {
          res.status(204).json(data)
        })
      });
  })
});

module.exports = router;