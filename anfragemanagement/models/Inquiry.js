const mongoose = require("mongoose")

const inquirySchema = mongoose.Schema({
    inquiryId: String,
    creationDate: Date,
    name: String,
    description: String,
    webpage: String,
    cost: Number,
    ap_name: String,
    ap_surname: String,
    ap_phoneNumber: String,
    inquiryStatus: {
        type: String,
        enum: ["NEW", "IN_PROCESS", "DENIED", "ACCEPTED"],
        default: "NEW"
    }
    /*
    guestData: {
        email: String,
        firm: String,
        name: String,
        surname: String,
        adress: {
            street: String,
            cp: String,
            town: String,
            country
        } 
    },
    buiData: {

    }*/
})

module.exports = mongoose.model("Inquiry", inquirySchema)