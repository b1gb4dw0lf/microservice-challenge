const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const microserviceKit = require('microservice-kit');


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


User.pre('save', async (next) => {
  try {
    let cryptoQueue = microserviceKit.amqpKit.getQueue('crypto');
    let cryptoResponse = await cryptoQueue.sendEvent('createPassword', {password: this.password});
    this.password = cryptoResponse.password;
    this.salt = cryptoResponse.salt;
    next();
  } catch (err) {
    throw new Error(err);
  }
});


module.exports = mongoose.model('User', User);
