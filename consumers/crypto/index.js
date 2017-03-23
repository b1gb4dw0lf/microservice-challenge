const mongoose = require('mongoose');
const microserviceKit = require('./lib/microservice-kit');
const crypto = require('./lib/cryptutils');


microserviceKit.init()
  .then(async () => {
    console.log('Crypto service is actively consuming.');

    let cryptoQueue = microserviceKit.amqpKit.getQueue('crypto');

    /**
     * @param {Object} {password}
     */
    cryptoQueue.consumeEvent('createPassword', async (data, done) => {
      try {
        let salt = await crypto.generateSalt();
        let hash = await crypto.generateHash(data.password, salt);
        done(null, {
          "hash": hash,
          "salt": salt
        });
      } catch (err) {
        console.log(err);
        done(err);
      }
    });

    /**
     * @param {Object} {password, salt, hash}
     */
    cryptoQueue.consumeEvent('compareHash', async (data, done) => {
      try {
        let hash = await crypto.generateHash(data.password, data.salt);
        done(null, data.hash === hash);
      } catch (err) {
        console.log(err);
        done(err);
      }
    });

  })
  .catch((error) => {
    console.log(error);
  });
