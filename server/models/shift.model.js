const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const shiftSchema = new Schema({
    title: {type: String, required: true},
    description: String,
    points: Number,
    nextTask: {type: Schema.Types.ObjectId, ref:"Task"},
    scheduledTasks: [ {type: Schema.Types.ObjectId, ref:"Task"}]
}, 
{
  timestamps: true
});

const Shift = mongoose.model('Shift', shiftSchema);
module.exports = Shift;


