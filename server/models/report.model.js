const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const reportSchema = new Schema({
    startDate: Date,
    endDate: Date,
    frequency: {type: String, enum: ["weekly", "monthly"]},
    stats: [ {user: {type: Schema.Types.ObjectId, ref:"User"}, score: Number} ]
}, 
{
  timestamps: true
});

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;



