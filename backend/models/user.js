const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password_hash: {
        type: String,
        required: true
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
UserSchema.virtual('budgets', {
    ref: 'Budget',
    localField: '_id',
    foreignField: 'userId',
})
UserSchema.virtual('expenses', {
    ref: 'Expense',
    localField: '_id',
    foreignField: 'userId',
})

const User = module.exports = mongoose.model('User', UserSchema);