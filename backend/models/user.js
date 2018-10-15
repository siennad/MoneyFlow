const mongoose = require('mongoose');

var Schema = mongoose.Schema;
const UserSchema = new Schema({
        name: String,
        email: String,
        password: String,
    }
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
);

module.exports = mongoose.model('User', UserSchema, 'users');