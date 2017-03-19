const mongoose = require('mongoose');
const microserviceKit = require('microservice-kit');

microserviceKit.init()
  .then(() => {

  })
  .catch((error) => {
    console.log(error);
  });
