const mongoose = require('mongoose');

const BudgetSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    period: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

BudgetSchema.virtual('Expenses', {
    ref: 'Expense',
    localField: '_id',
    foreignField: 'budgetId',
})

const Budget = module.exports = mongoose.model('Budget', BudgetSchema);