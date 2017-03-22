'use strict';

const MicroserviceKit = require('microservice-kit');

const microserviceKit = new MicroserviceKit({
  type: 'crypto-worker',
  config: null, // Dont use config file! Niye?
  amqp: {
    url: 'amqp://rabbitmq:5672',
    queues: [
      {
        name: 'crypto',
        key: 'crypto',
        options: {durable: true}
      }
    ]
  }
});

module.exports = microserviceKit;
