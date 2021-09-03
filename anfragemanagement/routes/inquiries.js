var express = require('express');
var router = express.Router();
const Inquiry = require("../models/Inquiry.js")

router.post("/create-inquiry", async (req, res) => {
    try {
        const generatedDateForCreationDate = new Date()
        const generatedIdForInquiryId = Math.random().toString(36).substr(2, 9)
        const inq = new Inquiry({
            userId: req.body.userId,
            inquiryId: generatedIdForInquiryId,
            creationDate: generatedDateForCreationDate,
            name: req.body.name,
            type: req.body.type,
            description: req.body.description,
            webpage: req.body.webpage,
            cost: req.body.cost,
            manufacturer: req.body.manufacturer,
            characteristic: req.body.characteristic,
            logo: req.body.logo,
            downloadLink: req.body.downloadLink,
            contact: req.body.contact
        })
        await inq.save()
        res.send({inq, newInquiryAvailable: true})
    } catch {
        res.status(404)
        res.send({error: "Something went wrong"})
    }
})

router.get("/get-inquiry/:inquiryId", async (req, res) => {
    try{
        const inq = await Inquiry.findOne({inquiryId: req.params.inquiryId})
        res.send(inq)
    } catch {
        res.status(404)
        res.send({error: "Something went wrong"})
    }
})

router.get("/get-inquiries", async (req, res) => {
    try {
        const inq = await Inquiry.find()
        res.send(inq)
    } catch {
        res.status(404)
        res.send({error: "Something went wrong"})
    }
})

//get all inquiries from specific user
router.get("/get-inquiries/:userId", async (req, res) => {
    try {
        const inq = await Inquiry.find({userId: req.params.userId})
        res.send(inq)
    } catch {
        res.status(404)
        res.send({error: "Something went wrong"})
    }
})

router.delete("/delete/:inquiryId", async (req, res) => {
    try {
        Inquiry.findByIdAndRemove({inquiryId: req.params.inquiryId})
    } catch {
        res.status(404)
        res.send({error: "Something went wrong with the removing of an inquiry"})
    }
})

router.patch("/update-inquiry/:inquiryId", async (req, res) => {
    try {
        const inq = await Inquiry.findOne({inquiryId: req.params.inquiryId})
        if(req.body.inquiryStatus){
            inq.inquiryStatus = req.body.inquiryStatus
            await inq.save()
            res.send({inq, statusOfInquiryChanged: true})
        } else {
            if(req.body.name) inq.name = req.body.name       
            if(req.body.type) inq.type = req.body.type
            if(req.body.description) inq.description = req.body.description
            if(req.body.webpage) inq.webpage = req.body.webpage
            if(req.body.cost) inq.cost = req.body.cost
            if(req.body.manufacturer) inq.manufacturer = req.body.manufacturer
            if(req.body.characteristic.applicationField) inq.characteristic.applicationField = req.body.characteristic.applicationField
            if(req.body.characteristic.observationObject) inq.characteristic.observationObject = req.body.characteristic.observationObject
            if(req.body.characteristic.oberservationLimit) inq.characteristic.oberservationLimit = req.body.characteristic.oberservationLimit
            if(req.body.characteristic.targetGroup) inq.characteristic.targetGroup = req.body.characteristic.targetGroup
            if(req.body.characteristic.integrationLevel) inq.characteristic.integrationLevel = req.body.characteristic.integrationLevel
            if(req.body.logo) inq.logo = req.body.logo
            if(req.body.downloadLink) inq.downloadLink = req.body.downloadLink
            if(req.body.contact.ap_name) inq.contact.ap_name = req.body.contact.ap_name
            if(req.body.contact.ap_surname) inq.contact.ap_surname = req.body.contact.ap_surname
            if(req.body.contact.ap_phoneNumber) inq.contact.ap_phoneNumber = req.body.contact.ap_phoneNumber
            if(req.body.contact.ap_email) inq.contact.ap_email = req.body.contact.ap_email
            await inq.save()
            res.send(inq)
        }      
    } catch {
        res.status(404)
        res.send({error: "Something went wrong"})
    }
})

module.exports = router;
