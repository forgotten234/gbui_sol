const mongoose = require("mongoose")

const inquirySchema = mongoose.Schema({
    userId: String, //null if it's from guest
    inquiryId: String,
    creationDate: Date,
    name: String,
    type: String,
    description: String,
    webpage: String,
    cost: Number,
    manufacturer: [String],
    characteristic: {
        applicationField: [String],
        observationObject: [String],
        oberservationLimit: [String],
        targetGroup: [String],
        integrationLevel: [String]
    },
    logo: String,
    downloadLink: String,
    contact: {
        ap_name: String,
        ap_surname: String,
        ap_phoneNumber: String,
        ap_email: String,
    },
    inquiryStatus: {
        type: String,
        enum: ["NEW", "IN_PROGRESS", "DENIED", "ACCEPTED"],
        default: "NEW"
    }
})

module.exports = mongoose.model("Inquiry", inquirySchema)
