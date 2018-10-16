const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    budget: [{ type: Schema.Types.ObjectId, ref: 'Budget' }]

    /*, {
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
}*/
});

module.exports = mongoose.model('User', UserSchema, 'users');

//Query find budget by id