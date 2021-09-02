const mongoose = require("mongoose")

const buiSchema = mongoose.Schema({
    creationDate: Date,
    name: String,
    type: String,
    description: String,
    website: String,
    downloadLink: String,
    manufacturer: [String],
    price: String,
    contact: {
        title: String,
        firstName: String,
        lastName: String,
        telephoneNumber: String,
        email: String
    },
    logo: String,
    characteristic: {
        applicationField: [String],
        observationObject: [String],
        oberservationLimit: [String],
        targetGroup: [String],
        integrationLevel: [String]
    },
    userId: String
})

buiSchema.index({'$**': 'text'})

module.exports = mongoose.model("Bui", buiSchema)