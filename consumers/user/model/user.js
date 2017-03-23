const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const microserviceKit = require('../lib/microservice-kit');


let User = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  badges: [{
    _id: false,
    badge: {type: Schema.ObjectId, ref: 'Badge'}
  }],
  password: {type: String, required: true},
  salt: {type: String},
  createdAt: {type: Date, default: Date.now}
});


User.pre('save', async function(next) {
  try {
    let cryptoQueue = microserviceKit.amqpKit.getQueue('crypto');
    let cryptoResponse = await cryptoQueue.sendEvent('createPassword', {"password": this.password});
    this.password = cryptoResponse.hash;
    this.salt = cryptoResponse.salt;
    next();
  } catch (err) {
    console.log('Error', err);
    next(new Error('Something went wrong in pre save.'));
  }
});


module.exports = mongoose.model('User', User);
