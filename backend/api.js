const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

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

//add-user
router.post('/user/add', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((err, registeredUser) => {
        if (err) {
            console.log(err);
        } else {
            //res.json({msg: 'User added'});
            let payload = { subject: registeredUser._id };
            let token = jwt.sign(payload, 'secretKey');
            res.status(200).send({ token });
        }
    });
});

// verify user
router.post('/user/verify', (req, res) => {
    let userData = req.body
    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if (!user) {
                res.status(401).send('Invalid email');
            } else
            if (user.password !== userData.password) {
                res.status(401).send('Invalid password');
            } else {
                let payload = { subject: user._id };
                let token = jwt.sign(payload, 'secretKey');
                res.status(200).send({ token });
            }
        }
    })
});

//add-budget
router.post('/budget/add', (req, res) => {
    let budgetData = req.body
    let budget = new Budget(budgetData)
    budget.save((err, addedBudget) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send(addedBudget);
        }
    });
});

module.exports = router;