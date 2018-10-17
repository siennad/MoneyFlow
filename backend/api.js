const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('./models/user');
const Budget = require('./models/budget');
const Expense = require('./models/expense');

const mongoose = require('mongoose');
const db = "mongodb://ducle94:root123@ds042527.mlab.com:42527/moneyflowdb";

mongoose.connect(db, { useNewUrlParser: true }, err => {
    if (err) {
        console.log('Error in database connection: ' + err);
    } else {
        console.log('connected to database MongoDB');
    }
});

/* TEST FUNCTIONS */
router.get('/', (req, res) => {
    res.send('From API route')
});

//get user
router.post('/user', (req, res) => {
    User.findOne({ _id: req.body._id }, (e, r) => {
        e ? res.status(400).send(e) : {};
        if (r) {
            console.log(r);
            res.status(200).send(r);
        } else {}
    })
})

router.get('/users', (req, res) => {
    User.find((e, r) => {
        e ? res.status(400).send(e) : {};
        if (r) {
            console.log(r);
            res.status(200).send(r);
        } else {}
    })
})

router.post('/budgets', (req, res) => {
    User.findOne({ _id: req.body.userid }).populate('budget').exec(function(e, r) {
        if (e) {
            res.status(400).send(e)
            console.log(e)
        }
        if (r) {
            console.log(r.budget);
            let budget = {
                id: r.budget[0]._id,
                period: r.budget[0].period,
                amount: r.budget[0].amount,
                date: r.budget[0].date,
                expenseList: r.budget[0].expenseList
            }
            res.status(200).send(budget);
        }
    })
})

/* END TEST FUNCTIONS */

//add-user
router.post('/user/add', (req, res) => {
    let userData = req.body.user
    let user = new User(userData)
    user.save((err, registeredUser) => {
        if (err) {
            if (err.code == 11000) {
                res.status(401).send("Email unavailable");
            } else {
                res.status(401).send("Register unsuccess. Please try again!")
            }
        } else {
            console.log(registeredUser);
            //res.json({msg: 'User added'});
            let payload = { subject: registeredUser._id };
            let token = jwt.sign(payload, 'secretKey');
            let userLogged = {
                id: user._id,
                name: user.name,
                email: user.email,
            };
            res.status(200).send({ token, userLogged });
        }
    });
});

// verify user
router.post('/user/verify', (req, res) => {
    let userData = req.body.user
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
                let userLogged = {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                };
                let token = jwt.sign(payload, 'secretKey');
                res.status(200).send({ token, userLogged });
            }
        }
    })
});

//add-budget
router.post('/add/budget', (req, res) => {
    let budgetData = req.body.budget
        // modify again the budget obj
    let newbudget = new Budget({
            _id: new mongoose.Types.ObjectId(),
            period: budgetData.period,
            amount: budgetData.amount,
            date: budgetData.date
        })
        // add budget to user
    User.findOne({ _id: req.body.userid },
            (err, user) => {
                !err ? {} : console.log("user not found");
                if (user) {
                    user.budget.push(newbudget._id);
                    user.save();
                    newbudget.user = user._id;
                    // console.log("user found")
                }
            })
        // save new budget
    newbudget.save((err, addedBudget) => {
        if (err) {
            // console.log("cannot save to db")
            // console.log(err);
            res.status(401).send(err);
        } else {
            let budget = {
                id: addedBudget._id,
                period: addedBudget.period,
                amount: addedBudget.amount,
                date: addedBudget.date,
                expenseList: addedBudget.expenseList
            }
            res.status(200).send(budget);
        }
    })
});

router.post('/get/budgets', (req, res) => {
    let userid = req.body.userid;

    User.findOne({ _id: userid }).populate('budget').exec(function(e, r) {
        if (e) {
            res.status(400).send(e)
                // console.log(e)
        }
        if (r) {
            // return only 1st
            // console.log(r.budget);
            let budget = {
                id: r.budget[0]._id,
                period: r.budget[0].period,
                amount: r.budget[0].amount,
                date: r.budget[0].date,
                expenseList: r.budget[0].expenseList
            }
            res.status(200).send(budget);
        }
    });
});

router.put('/update/budget', (req, res) => {
    let budgetid = req.body.id;
    Budget.findByIdAndUpdate(budgetid, {
            period: req.body.budget.period,
            amount: req.body.budget.amount
        }, { new: true },
        function(err, updatedBudget) {
            if (err) {
                res.status(400).send(err);
            }
            let budget = {
                id: updatedBudget._id,
                period: updatedBudget.period,
                amount: updatedBudget.amount,
                date: updatedBudget.date,
                expenseList: updatedBudget.expenseList
            }

            res.send(budget)
        })

})

module.exports = router;