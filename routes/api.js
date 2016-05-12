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
router.put('/pirates/:id', function(req,res,next) {
  return knex('pirates')
    .where('id',req.params.id)
    .update(req.body)
    .returning('*')
    .then(function(data){
      console.log(data)
      res.end()
    })

})

module.exports = router;
