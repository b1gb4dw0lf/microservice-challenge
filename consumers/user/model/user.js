const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let User = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  badges: [{
    _id: false,
    badge: {type: Schema.ObjectId, ref: 'Badge'}
  }],
  password: {type: String, required: true},
  salt: {type: String},
  createdAt: {type: Date, default: Date.now}
});


module.exports = mongoose.model('User', User);
