const mongoose = require('mongoose');

const ExpenseSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    budgetId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Budget',
    },
    name: {
        type: String,
        required: true,
    },
    spend: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['Household Utilities', 'Food', 'Gift', 'Entertainment', 'Education', 'Invest', 'Others']
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },

});

const Expense = module.exports = mongoose.model('Expense', ExpenseSchema);