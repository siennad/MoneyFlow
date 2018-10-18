const mongoose = require('mongoose');

delete mongoose.connection.models['User']

const Budget = require('./budget');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: { type: String, require: true },
    email: { type: String, unique: true, require: true },
    password: { type: String, require: true },
    budget: [{
        type: Schema.Types.ObjectId,
        ref: 'Budget',
    }],

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
/*
UserSchema.virtual('budgets', {
    ref: 'Budget',
    localField: '_id',
    foreignField: 'userId',
})*/

module.exports = mongoose.model('User', UserSchema, 'users');

//Query find budget by id