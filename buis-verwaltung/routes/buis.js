var express = require('express');
var router = express.Router();
const Bui = require("../models/Bui.js")

router.get("/get-buis", async (req, res) => {
    try{
        const bui = await Bui.find({})
        res.send(bui)
    } catch {
        res.status(404)
        res.send({error: "Something went wrong"})
    }
})

router.get("/get-buis/:_id", async (req, res) => {
    try{
        const bui = await Bui.find({_id: req.params._id})
        res.send(bui)
    } catch {
        res.status(404)
        res.send({error: "Something went wrong"})
    }
})

router.delete("/delete/:_id", async (req, res) => {
    try {
        await Bui.deleteOne({_id: req.params._id})
    } catch {
        res.status(404)
        res.send({error: "Something went wrong"})
    }
})

module.exports = router;
