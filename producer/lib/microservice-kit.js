'use strict';

const MicroserviceKit = require('microservice-kit');

const microserviceKit = new MicroserviceKit({
  type: 'core-worker',
  config: null, // Dont use config file! Niye?
  amqp: {
    url: 'amqp://rabbitmq:5672',
    queues: [
      {
        name: 'core',
        key: 'core',
        options: {durable: true}
      },
      {
        name: 'user',
        key: 'user',
        options: {durable: true}
      }
    ]
  }
});

module.exports = microserviceKit;
