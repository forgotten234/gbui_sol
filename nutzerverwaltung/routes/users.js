var express = require('express');
var router = express.Router();
const User = require("../models/User.js")
const saltRounds = 10;
const bcrypt = require('bcrypt');

router.patch("/update-user/:_id", async (req, res) => {
  try {
    const user = await User.findOne({_id: req.params._id})
    if(req.body.email){
      user.email = req.body.email
    }
    if(req.body.password){
      bcrypt.genSalt(saltRounds, async function(err, salt) {
        bcrypt.hash(req.body.password, salt, async function(err, hash) {
          user.password = hash
        })
      })
    }
    if(req.body.adresse){
      if(req.body.adresse.straße){
        user.adresse.straße = req.body.adresse.straße
      }
      if(req.body.adresse.plz){
        user.adresse.plz = req.body.adresse.plz
      }
      if(req.body.adresse.stadt){
        user.adresse.stadt = req.body.adresse.stadt
      }
      if(req.body.adresse.land){
        user.adresse.land = req.body.adresse.land
      }
    }
    if(req.body.firma){
      user.firma = req.body.firma
    }
    if(req.body.name){
      user.name = req.body.name
    }
    if(req.body.vorname){
      user.vorname = req.body.vorname
    }

    await user.save()
    res.send(user)
  } catch {
    res.status(404)
    res.send({error: "Something went wrong!"})
  }
})

router.get("/get-users/:_id", async (req, res) => {
  try{
    const user = await User.findOne({_id: req.params._id})
  } catch {
    res.status(404)
    res.send({error: "Something went wrong!"})
  }
})

module.exports = router;
