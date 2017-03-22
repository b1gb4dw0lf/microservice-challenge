const mongoose = require('mongoose');
const microserviceKit = require('./lib/microservice-kit');


microserviceKit.init()
  .then(async () => {
    console.log('Crypto service is actively consuming.');
  })
  .catch((error) => {
    console.log(error);
  });
