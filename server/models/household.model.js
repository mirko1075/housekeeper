const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const householdSchema = new Schema({
  
    title: {type: String, default: "Our home", required: true},
    admin: {type: Schema.Types.ObjectId, ref:"User"},
    members: [{type: Schema.Types.ObjectId, ref:"User"}],
    expenses: [{type: Schema.Types.ObjectId, ref:"Expense"}],
    shifts: [{type: Schema.Types.ObjectId, ref:"Shift"}],
    shoppingList: [{type: Schema.Types.ObjectId, ref:"ShoppingItem"}],
    upcomingWeeklyReport: {type: Schema.Types.ObjectId, ref:"Report"},
    upcomingMonthlyReport: {type: Schema.Types.ObjectId, ref:"Report"},
    reportHistory: [ {type: Schema.Types.ObjectId, ref:"Report"} ]
}, 
{
  timestamps: true
});

const Household = mongoose.model('Household', householdSchema);
module.exports = Household;