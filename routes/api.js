var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development'])

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json( { title: 'Pirates stuff' });
});

router.get('/pirates',function(req,res,next) {
  return knex('pirates')
          .then(function(pirates) {
            console.log(pirates)
            res.json(pirates)
    })
})

module.exports = router;
