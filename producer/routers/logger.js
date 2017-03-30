const Router = require('koa-router');
const microserviceKit = require('../lib/microservice-kit');
const isAuthenticated = require('../lib/middlewares');

const router = new Router();

router.post('/', isAuthenticated, async (ctx, next) => {
  try {
    let loggerQueue = microserviceKit.amqpKit.getQueue('logger');
    let newBody = ctx.request.body;
    newBody.user = ctx.state.user;
    console.log(newBody);
    let badge = await loggerQueue.sendEvent('create', newBody);
    ctx.status = 200;
  } catch (err) {
    console.log(err);
    ctx.throw(500);
  }
});


module.exports = router;
