const mongoose = require('mongoose');
const Promise = require('bluebird');
const microserviceKit = require('./lib/microservice-kit');
const User = require('./model/user');

Promise.promisifyAll(mongoose);

//Ensure database connection before consuming.
mongoose.connect('mongodb://database/emlakjet').then((conn) => {
  microserviceKit.init()
    .then(async () => {
      console.log('User service is actively consuming.');

      let userQueue = microserviceKit.amqpKit.getQueue('user');

      /**
       * Finds and returns a single document. If no document is
       * found, might return null.
       * @param {Object} {email, selection}
       */
      userQueue.consumeEvent('get', async (data, done) => {
        try {
          let user = await User.findOne({"email": data.email});
          done(null, user);
        } catch (err) {
          console.log(err);
          done(err);
        }
      });

      /**
       * @param {Object}
       * @return {Object} User
       */
      userQueue.consumeEvent('create', async (data, done) => {
        try {
          //Mongoose validates fields for us.
          //Form cleaning is API's job.
          let newUser = new User(data);
          let user = await newUser.save();
          done(null, user);
        } catch (err) {
          done(err);
        }
      });

      userQueue.consumeEvent('getLeaderboard', async (data, done) => {
        try {
          let leaderboard = await User.find()
                                      .select('firstName lastName points')
                                      .sort('points');
          done(null, leaderboard);
        } catch (error) {
          console.log(error);
          done(error);
        }
      });

      userQueue.consumeEvent('update', async (data, done) => {
        try {
          let newBody = {
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            email: data.user.email,
            badges: data.user.badges
          }
          let user = await User.findOneAndUpdate({_id: data.user._id}, newBody);

          done(null, user);
        } catch (error) {
          console.log(error);
          done(error);
        }
      });

    })
    .catch((error) => { //TODO: Get rid of one catch.
      console.log('Error', error);
    });
  })
  .catch((err) => {
    console.log('Error', err);
  });
