const mongoose = require('mongoose');

delete mongoose.connection.models['Budget']
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;

const User = require('./user')
const Expense = require('./expense')

const BudgetSchema = new Schema({
    _id: Schema.Types.ObjectId,
    period: {
        type: String,
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
    user: { type: Schema.Types.ObjectId, ref: 'User', childPath: 'budget' },
    expenseList: [{ type: Schema.Types.ObjectId, ref: 'Expense', required: false }]
        /*}, {
            toJSON: { virtuals: true },
            toObject: { virtuals: true }
        });

        BudgetSchema.virtual('Expenses', {
            ref: 'Expense',
            localField: '_id',
            foreignField: 'budgetId',*/
})

module.exports = mongoose.model('Budget', BudgetSchema);
