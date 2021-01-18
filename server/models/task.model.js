const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const commentSubschema = require('./comment.subschema.js');
const reactionSubschema = require('./reaction.subschema.js');

const taskSchema = new Schema({
    title: {type: String, required: true},
    description: String,
    deadline: Date,
    points: Number,
    publishedBy: {type: Schema.Types.ObjectId, ref:"User"},
    assignedTo: {type: Schema.Types.ObjectId, ref:"User"},
    isPending: {type: Boolean, default: false},
    isExpired: {type: Boolean, default: false},
    comments: [ commentSubschema ],
    reactions: [ reactionSubschema ]
}, 
{
  timestamps: true
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;