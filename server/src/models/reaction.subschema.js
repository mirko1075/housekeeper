const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const reactionSubschema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref:"User"},
    reaction: {type: String, enum: ["applause", "like-neutral", "heart", "celebrate", "surprised-face"]}
}, 
{
  timestamps: true
});

module.exports = reactionSubschema;