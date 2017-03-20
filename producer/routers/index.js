const Router = require('koa-router');
const microserviceKit = require('../lib/microservice-kit');

const router = new Router();

router.get('/', async (ctx, next) => {

  ctx.body = {"message": "hello world"};

  /*
  let coreQueue = microserviceKit.amqpKit.getQueue('core');

  try {
    ctx.body = await coreQueue.sendEvent('testjob', {'some': 'data'})
  } catch (error) {
    console.log(error);
  }
  */
});

module.exports = router;
