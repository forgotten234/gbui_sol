var express = require('express');
var router = express.Router();
const Bui = require("../models/Bui.js")

router.get("/get-characteristics", async (req, res) => {
    try {
        const bui = await Bui.find({_id: "61153f3e8824b4c941a992f0"})
        res.send(bui)
    } catch {
        res.status(404)
        res.send({error: "Something went wrong"})
    }
})

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

router.get("/get-bui/:userId", async (req, res) => {
    try{
        const bui = await Bui.find({userId: req.params.userId})
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

router.post("/search-bui", async (req, res) => {
    try {
        const bui = await Bui.find({$text: {$search: req.body.searchString}})
        res.send(bui)
    } catch {
        res.status(404)
        res.send({error: "Something went wrong"})
    }
})

router.post("/create-bui", async (req, res) => {
    try {
        const generatedDateForCreationDate = new Date()
        const bui = new Bui({
            creationDate: generatedDateForCreationDate,
            name: req.body.name,
            type: req.body.type,
            description: req.body.description,
            website: req.body.website,
            downloadLink: req.body.downloadLink,
            manufacturer: req.body.manufacturer,
            price: req.body.price,
            contact: req.body.contact,
            logo: req.body.logo,
            characteristic: req.body.characteristic,
            userId: req.body.userId,
        })
        await bui.save()
        res.send(bui)
    } catch {
        res.status(404)
        res.send({error: "Something went wrong"})
    }
})

module.exports = router;
