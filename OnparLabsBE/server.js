require('dotenv').config()
const express = require("express")
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true,useUnifiedTopology: true})

const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.on('open', () => console.log('connected to database'))

const EmployeesRouter = require('./routes/EmployeesRouter')
const AdminsRouter = require('./routes/AdminsRouter')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use("/Employees",cors, EmployeesRouter)
app.use("/Admins",cors, AdminsRouter)
app.use('/uploads',cors, express.static('uploads'))

function cors (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
};

app.listen(3001, () => console.log('server started'))

module.exports = app;