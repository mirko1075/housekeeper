const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const shoppingItem = new Schema({
    title: {type: String, required: true},
    quantity: {type: Number},
    unit: {type: String, enum: ['pcs', 'kg', 'lt', 'pack']}
}, 
{
  timestamps: true
});

const ShoppingItem = mongoose.model('ShoppingItem', shoppingItem);
module.exports = ShoppingItem;


