const mongoose = require('mongoose');
const microserviceKit = require('./lib/microservice-kit');
const Log = require('./model/log');

mongoose.connect('mongodb://database/emlakjet')
  .then(async (conn) => {
    try {
      await microserviceKit.init()
      console.log('Logger service is actively consuming.');
      let loggerQueue = microserviceKit.amqpKit.getQueue('logger');

      loggerQueue.consumeEvent('create', async (data ,done) => {
        try {
          let newLog = new Log(data);

          let log = await newLog.save();
          let clicks = await Log.find({user: data.user._id, type: 'click'}).count();

          let badgeQueue = microserviceKit.amqpKit.getQueue('badge');
          let badges = await badgeQueue.sendEvent('get');

          badges.forEach(async (item) => {
            if (item.type == 'clickable') {
              if (clicks >= item.amount) {
                let userQueue = microserviceKit.amqpKit.getQueue('user');
                if (data.user.badges.indexOf(item._id) == -1) {
                  let userBody = data.user;
                  userBody.badges.push(item);
                  userBody.points = parseInt(data.user.points) + item.point;
                  console.log(userBody);
                  let newUser = await userQueue.sendEvent('update', {user: userBody});
                }
              }
            } else {
              let scrolls = await Log.distinct('path', {
                user: data.user._id,
                type: 'scroll',
                amount: parseInt(item.percent)});

              scrolls = scrolls.length;

              if (scrolls >= item.amount) {
                if (data.user.badges.indexOf(item._id) == -1) {
                  let userQueue = microserviceKit.amqpKit.getQueue('user');
                  let userBody = data.user;
                  userBody.badges.push(item);
                  userBody.points = parseInt(data.user.points) + item.poin;
                  console.log(userBodyr);
                  await userQueue.sendEvent('update', {user: userBody});
                }
              }
            }
          })

          done(null, log);
        } catch (error) {
          console.log(error);
          done(error);
        }
      });

      loggerQueue.consumeEvent('get', async (data, done) => {
        try {
          let logs = Log.find({user: data.user, type: data.type});
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
