const mongoose = require('mongoose');
const Promise = require('bluebird');
const microserviceKit = require('./lib/microservice-kit');
const User = require('./model/user');

Promise.promisifyAll(mongoose);

mongoose.connect('mongodb://database/emlakjet')
  .then((conn) => {
    microserviceKit.init()
      .then(async () => {
        console.log('User service is actively consuming.');

        let userQueue = microserviceKit.amqpKit.getQueue('user');

        /**
         * Finds and returns a single document. If no document is
         * found, might return null.
         * @param {Object} {id}
         */
        userQueue.consumeEvent('get', async (data, done) => {
          try {
            let user = User.findById(data.id);
            done(user);
          } catch (err) {
            done({"error": err});
          }
        });

        /**
         * @param {Object}
         * @return {Object} User
         */
        userQueue.consumeEvent('create', async (data, done) => {
          try {
            //Mongoose validates fields for us.
            let newUser = new User(data);
            let user = await newUser.save();
            done(user);
          } catch (err) {
            done({"error": err});
          }
        });

      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch((err) => {
    console.log(err);
  });
