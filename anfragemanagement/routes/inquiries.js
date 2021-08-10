var express = require('express');
var router = express.Router();
const Inquiry = require("../models/Inquiry.js")

router.post("/create-inquiry", async (req, res) => {
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
        ap_phoneNumber: req.body.ap_phoneNumber
    })
    await inq.save()
    //send also newInquiryAvailable to notify admin to check if new bui is available
    res.send({inq, newInquiryAvailable: true})
})

router.get("/get-inquiry/:inquiryId", async (req, res) => {
    try{
        const inq = await Inquiry.findOne({inquiryId: req.params.inquiryId})
    } catch {
        res.status(404)
        res.send({error: "Something went wrong"})
    }
})

router.delete("/delete/:inquiryId", async (req, res) => {
    try {
        Inquiry.findByIdAndRemove({inquiryid: req.params.inquiryId})
    } catch {
        res.status(404)
        res.send({error: "Something went wrong with the removing of an inquiry"})
    }
})

module.exports = router;
