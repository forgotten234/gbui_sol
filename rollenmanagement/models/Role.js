const mongoose = require("mongoose")

const roleSchema = mongoose.Schema({
    role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User'
    },
    userId: String
})

module.exports = mongoose.model("Role", roleSchema)