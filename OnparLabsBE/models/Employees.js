const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    employeeID: {
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
    age: {
        type: Number
    },
    phone: {
        type: Number
    },
    email: {
        type: String
    },
    files: {
        type: String
    },
    isEmployee: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Employees', EmployeeSchema)