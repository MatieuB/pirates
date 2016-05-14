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
// return all pirates from db
router.get('/pirates',function(req,res,next) {
  return knex('pirates')
  .then(function(pirates) {
    console.log(pirates)
    res.json(pirates)
  })
})
// get a pirate by id
router.get('/pirate/:id',function(req,res,next) {
  return knex('pirates')
    .where('id',req.params.id)
    .then(function(pirate) {
      console.log('from the database======',pirate)
      res.json(pirate);
    })
})
// add a pirate
router.post('/pirates/add',function(req,res,next) {
  return knex('pirates')
  .insert(req.body)
  .returning('*')
  .then(function(newPirate) {
    console.log(newPirate)
    res.json(newPirate)
  })
})
// add a user
router.post('/users/add',function(req,res,next) {
  return knex('users')
  .insert(req.body)
  .returning('*')
  .then(function(newUser) {
    console.log('new user:',newUser)
    res.json(newUser)
  })
})
// return all usersfrom db
router.get('/users',function(req,res,next) {
  return knex('users')
  .then(function(users) {
    console.log(users)
    res.json(users)
  })
})
// delete a pirate by id
router.delete('/pirates/:id',function(req,res,next) {
  return knex('pirates')
    .where({id:req.params.id})
    .del()
    .then(function() {
      res.end()
    })
})
// update a pirate
router.put('/edit/pirate/:id', function(req,res,next) {
  return knex('pirates')
    .where({id:req.params.id})
    .update({
      name: req.body.name,
      poison: req.body.poison,
      accessory: req.body.accessory,
      image_url: req.body.image_url
    })
    .returning('*')
    .then(function(){
      res.end()
    })
})

module.exports = router;
