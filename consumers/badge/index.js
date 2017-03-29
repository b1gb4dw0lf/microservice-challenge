const mongoose = require('mongoose');
const microserviceKit = require('./lib/microservice-kit');
const Badge = require('./model/badge');

mongoose.connect('mongodb://database/emlakjet')
  .then(async (conn) => {
    try {
      await microserviceKit.init()
      console.log('Badge service is actively consuming.');
      let badgeQueue = microserviceKit.amqpKit.getQueue('badge');

      badgeQueue.consumeEvent('get', async (data ,done) => {
        try {
          let badges = Badge.find();
          done(null, badges);
        } catch (error) {
          done(error);
        }
      });

      badgeQueue.consumeEvent('create', async (data, done) => {
        try {
          let newBadge = new Badge(data);
          let badge = await newBadge.save();
          done(null, badge);
        } catch (error) {
          done(error);
        }
      });

    } catch (error) {
      console.log(error);
    }
  })
  .catch((error) => {
    console.log(error);
  });
