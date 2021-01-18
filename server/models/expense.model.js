const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const expenseModel = new Schema({
    paidBy: {type: Schema.Types.ObjectId, ref:"User"},
    title: {type: String, required: true},
    amount: {type: Number, required: true}
}, 
{
  timestamps: true
});

const Expense = mongoose.model('Expense', expenseModel);
module.exports = Expense;


