const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Badge = new Schema({
  name: {type: String, required: true},
  slug: {type: String, required: true, unique: true},
  type: {type: String, enum: ['clickable', 'scrollable'], required: true},
  amount: {type: Number, required: true}, // Considered as percent if scrollable
  createdAt: {type: Date, default: Date.now}
});


module.exports = mongoose.model('Badge', Badge);
