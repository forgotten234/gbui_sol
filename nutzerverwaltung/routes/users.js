var express = require('express');
var router = express.Router();
const User = require("../models/User.js")
const saltRounds = 10;
const bcrypt = require('bcrypt');

router.delete("/delete-user/:userId", async (req, res) => {
    try {
        await User.deleteOne({userId: req.params.userId})
    } catch {
        res.status(404)
        res.send({error: "Something went wrong"})
    }
})

router.patch("/update-user/:userId", async (req, res) => {
  try {
    const user = await User.findOne({userId: req.params.userId})
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
    //check if adress changes are available
    if(req.body.adress){
      if(req.body.adress.street){
        user.adress.street = req.body.adress.street
      }
      if(req.body.adress.cp){
        user.adress.cp = req.body.adress.cp
      }
      if(req.body.adress.town){
        user.adress.town = req.body.adress.town
      }
      if(req.body.adress.country){
        user.adress.country = req.body.adress.country
      }
    }
    if(req.body.firm){
      user.firm = req.body.firm
    }
    if(req.body.name){
      user.name = req.body.name
    }
    if(req.body.surname){
      user.surname = req.body.surname
    }

    await user.save()
    res.send(user)
  } catch {
    res.status(404)
    res.send({error: "Something went wrong!"})
  }
})

router.get("/get-user/:userId", async (req, res) => {
  try{
    const user = await User.findOne({userId: req.params.userId})
    res.send(user)
  } catch {
    res.status(404)
    res.send({error: "Something went wrong!"})
  }
})

router.get("/get-users", async (req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch {
        res.status(404)
        res.send({error: "Something went wrong!"})
    }
})

module.exports = router;
