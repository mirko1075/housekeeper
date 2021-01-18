const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commentSubschema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref:"User"},
    comment: String,
    imageUrl: String
}, 
{
  timestamps: true
});

module.exports = commentSubschema;