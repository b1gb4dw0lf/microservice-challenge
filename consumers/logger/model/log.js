const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Log = new Schema({
  user: {type: Schema.ObjectId, ref: 'User', required: true},
  path: {type: String},
  type: {type: String},
  amount: {type: Number},
  createdAt: {type: Date, default: Date.now}
});


module.exports = mongoose.model('Log', Log);
