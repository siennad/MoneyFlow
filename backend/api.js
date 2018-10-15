var express = require("express");
const router = express.Router();

const User = require('./models/user');
const Budget = require('./models/budget');
const Expense = require('./models/expense');

const mongoose = require('mongoose');
const db = "mongodb://ducle94:tmgs8647@ds052978.mlab.com:52978/authentication";

mongoose.connect(db, { useNewUrlParser: true }, err => {
    if (err) {
        console.log('Error in database connection: ' + err);
    } else {
        console.log('connected to database MongoDB');
    }
});

router.get('/', (req, res) => {
    res.send('From API route')
});

router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error)
        } else {
            res.status(200).send(registeredUser)
        }
    })
});

module.exports = router;