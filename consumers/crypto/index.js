const mongoose = require('mongoose');
const microserviceKit = require('./lib/microservice-kit');
const crypto = require('./lib/cryptutils');


microserviceKit.init()
  .then(async () => {
    console.log('Crypto service is actively consuming.');

    let cryptoQueue = microserviceKit.amqpKit.getQueue('crypto');

    cryptoQueue.consumeEvent('createPassword', async (data, done) => {
      try {
        let password = data.password;
        let salt = await crypto.generateSal();
        let hash = await crypto.generateHash(password, salt);
        done(hash);
      } catch (err) {
        throw new Error(err);
      }
    });


    cryptoQueue.consumeEvent('compareHash', async (data, done) => {
      try {
        let hash = await crypto.generateHash(data.password, data.salt);
        done(data.hash === hash);  
      } catch (err) {
        throw new Error(err);
      }
    });

  })
  .catch((error) => {
    console.log(error);
  });
