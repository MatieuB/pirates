var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);
var cors = require('cors');
var app = express();
// Allow CORS
app.use(cors());
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
router.get('/pirate/:id',function(req,res,next) {
  return knex('pirates')
    .where('id',req.params.id)
    .then(function(pirate) {
      console.log('from the database======',pirate)
      // var myPirate = pirate.data[0];
      res.json(pirate);
    })
})
router.post('/pirates/add',function(req,res,next) {
  return knex('pirates')
  .insert(req.body)
  .returning('*')
  .then(function(newPirate) {
    console.log(newPirates)
    res.json(newPirate)
  })
})
router.delete('/pirates/:id',function(req,res,next) {
  return knex('pirates')
    .where({id:req.params.id})
    .del()
    .then(function() {
      res.end()
    })
})
router.put('/edit/pirate/:id', function(req,res,next) {
  // console.log('req.params.id======',req.params.id)
  // console.log(req);
  return knex('pirates')
    .where({id:1})
    .first()
    .update({
      name: req.body.name,
      poison: req.body.poison,
      accessory: req.body.accessory,
      image_url: req.body.image_url
    })
    .returning('*')
    .then(function(data){
      console.log(data)
      res.end()
    })

})

module.exports = router;
