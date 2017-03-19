'use strict';

const MicroserviceKit = require('microservice-kit');

const microserviceKit = new MicroserviceKit({
  type: 'badge-worker',
  config: null, // Dont use config file! Niye?
  amqp: {
    url: 'amqp://rabbitmq:5672',
    queues: [
      {
        name: 'badge',
        key: 'badge',
        options: {durable: true}
      }
    ]
  }
});

module.exports = microserviceKit;
