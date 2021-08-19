var express = require('express');
var router = express.Router();
const Role = require("../models/Role.js")

router.post("/create", async (req, res) => {
    const role = new Role({
        userId: req.body.userId,
        role: req.body.role
    })
    await role.save()
    res.send(role)
})

router.get("/get-role/", async (req, res) => {
    const roles = await Role.find()
    res.send(roles)
})

router.get("/get-role/:userId", async (req, res) => {
    try{
        const role = await Role.find({userId: req.params.userId})
        console.log(role)
        res.send(role)
    } catch {
        res.status(404)
        res.send({error: "Something went wrong!"})
    }
})

module.exports = router;