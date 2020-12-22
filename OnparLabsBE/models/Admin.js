const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    adminID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    designation: {
        type: String
    },
    email: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Admins', AdminSchema)