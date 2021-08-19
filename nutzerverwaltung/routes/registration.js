var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require("../models/User.js");

router.post('/register', async (req, res) => {
  var password = req.body.password
  var email = req.body.email
  var adress = req.body.adress
  var firm = req.body.firm
  var name = req.body.name
  var surname = req.body.surname
  var creationDate = new Date()
  var userId = req.body.userId
  try{
      User.findOne({email: req.body.email.email}, function(err, user) {
        console.log(adress)
        if(!user){
          bcrypt.genSalt(saltRounds, async function(err, salt) {
            bcrypt.hash(password.password.toString(), salt, async function(err, hash) {
              const user = new User({
                email: email.email.toString(),
                password: hash,
                adress: adress,
                firm: firm.toString(),
                name: name.toString(),
                surname: surname.toString(),
                creationDate: creationDate,
                userId: userId.toString()
              })
              await user.save()
              res.send({user, errorAvailable: false})   
            });
            console.log(user)
          });
        } else {
          res.send({error: "User already registered", errorAvailable: true})
        }
      })
  }catch (err){
    next(err)
    res.status(404)
    res.send({error: "Did not Work!"})
  }
});

module.exports = router;