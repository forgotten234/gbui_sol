var express = require('express');
var router = express.Router();
const Inquiry = require("../models/Inquiry.js")

router.post("/create-inquiry", async (req, res) => {
    try {
        const generatedDateForCreationDate = new Date()
        const generatedIdForInquiryId = Math.random().toString(36).substr(2, 9)
        const inq = new Inquiry({
            inquiryId: generatedIdForInquiryId,
            creationDate: generatedDateForCreationDate,
            name: req.body.name,
            description: req.body.description,
            webpage: req.body.webpage,
            cost: req.body.cost,
            ap_name: req.body.ap_name,
            ap_surname: req.body.ap_surname,
            ap_phoneNumber: req.body.ap_phoneNumber,    
            ap_email: req.body.email  
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
        const inq = await Inquiry.findOne({inquiryId: req.params.inquiryID})
        if(req.body.inquiryStatus){
            inq.inquiryStatus = req.body.inquiryStatus
            await user.save()
            res.send({inq, statusOfInquiryChanged: true})
        } else {
            if(req.body.name) inq.name = req.body.name       
            if(req.body.description) inq.description = req.body.description
            if(req.body.webpage) inq.webpage = req.body.webpage
            if(req.body.cost) inq.cost = req.body.cost
            if(req.body.ap_name) inq.ap_name = req.body.ap_name
            if(req.body.ap_surname) inq.ap_surname = req.body.ap_surname
            if(req.body.ap_phoneNumber) inq.ap_phoneNumber = req.body.ap_phoneNumber
            if(req.body.ap_email) inq.ap_email = req.body.ap_email
            await user.save()
            res.send(user)
        }      
    } catch {
        res.status(404)
        res.send({error: "Something went wrong"})
    }
})

module.exports = router;
