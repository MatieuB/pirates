var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);
var app = express();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

// me route
// router.get('/users/me', function (req, res, next) {
//   if (req.headers.authorization) {
//     const token = req.headers.authorization.split(' ')[1];
//
//     // IF it was expired - verify would actually throw an exception
//     // we'd have to catch in a try/catch
//     const payload = jwt.verify(token, process.env.JWT_SECRET);
//
//     // payload is {id: 56}
//     knex('users').where({id: payload.id}).first().then(function (user) {
//       if (user) {
//         res.json({id: user.id, name: user.name})
//       } else {
//         res.status(403).json({
//           error: "Invalid ID"
//         })
//       }
//     })
//   } else {
//     res.status(403).json({
//       error: "No token"
//     })
//   }
// })

// router.get('/me',function (req,res,next) {
//   //√get jwt from auth header
//   //√ "Bearer ;alsdkjf;adj" || nothing
//   //√string logic to parse this
//   //√decode it and find use id
//   //√return the user object
//   console.log(req.headers.authorization)
//   if (req.headers.authorization) {
//     const token = req.headers.authorization.split(' ')[1]
//     //if expired, verify would try to catch it in try/catch
//     try {
//       const payload = jwt.verify(token , process.env.JWT_SECRET)
//       //payload is {id: 32} or something
//       knex('users')
//         .where({id: payload.id}).first()
//         .then(function (user) {
//           if(user) {
//             res.json({
//               id: user.id,
//               name: user.name
//             })
//           } else {
//             res.json({
//               error:'no user'
//             })
//           }
//
//         })
//    catch (e) {
//       res.json({
//         error:'no token'
//       })
//
//     }
//   } else {
//     res.json({
//       error:'no token'
//     })
//   }
// })

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
router.post('/signup', function(req, res, next) {
  const errors = []

  if (!req.body.email || !req.body.email.trim()) errors.push("Email can't be blank");
  if (!req.body.username || !req.body.username.trim()) errors.push("Name can't be blank");
  if (!req.body.password || !req.body.password.trim()) errors.push("Password can't be blank");

  if (errors.length) {
    res.status(422).json({
      errors: errors
    })
  } else {
    knex('users')
      .whereRaw('lower(email) = ?', req.body.email.toLowerCase())
      .count() // [{count: "0"}]
      .first() // {count: "0"}
      .then(function (result) {
         // {count: "0"}
         if (result.count === "0") {
           const saltRounds = 4;
           const hash = bcrypt.hashSync(req.body.password, saltRounds);
           knex('users')
            .insert({
              email: req.body.email,
              username: req.body.username,
              password: hash
            })
            .returning('*')
            .then(function (users) {
              const user = users[0]
              const token = jwt.sign({id:user.id}, process.env.JWT_SECRET);
              console.log('token',token);
              res.json({
              id: user.id,
              email: user.email,
              username: user.username,
              token: token
            })
          })
          } else {
          res.status(422).json({
            errors: ["Email has already been taken"]
          })
        }
      })
  }
  // √require knex
  // √check email, name, and password are all there
  //  √if not, return an error
  //√ check to see if the email already exists in the db
  // √ if so, return an error
  // √if we're OK
  // √ hash password
  // √ knex insert stuff from req.body
  // √ create a token
  //  √send back id, email, name, token
});


router.post('/users/add',function(req,res,next) {
  const errors = []

  if (!req.body.email || !req.body.email.trim()) errors.push("Email can't be blank");
  if (!req.body.username || !req.body.username.trim()) errors.push("Name can't be blank");
  if (!req.body.password || !req.body.password.trim()) errors.push("Password can't be blank");

  if (errors.length) {
    res.status(422).json({
      errors: errors
    })
  } else {
    knex('users')
      .whereRaw('lower(email) = ?', req.body.email.toLowerCase())
      .count() // [{count: "0"}]
      .first() // {count: "0"}
      .then(function (result) {
         // {count: "0"}
         if (result.count === "0") {
           const saltRounds = 4;
           const hash = bcrypt.hashSync(req.body.password, saltRounds);
           knex('users')
            .insert({
              email: req.body.email,
              username: req.body.username,
              password: hash
            })
            .returning('*')
            .then(function (users) {
              const user = users[0]
              const token = jwt.sign({id:user.id}, process.env.JWT_SECRET);
              res.json({
              id: user.id,
              email: user.email,
              username: user.username,
              token: token
            })
          })

          } else {
          res.status(422).json({
            errors: ["Email has already been taken"]
          })
        }
      })
  }


  // return knex('users')
  // .insert(req.body)
  // .returning('*')
  // .then(function(newUser) {
  //   console.log('new user:',newUser)
  //   res.json(newUser)
  // })
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
