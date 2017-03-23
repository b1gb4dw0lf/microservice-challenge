const Router = require('koa-router');
const microserviceKit = require('../lib/microservice-kit');

const router = new Router();


router.get('/', async (ctx, next) => {
  try {
    let userQueue = microserviceKit.amqpKit.getQueue('user');
    let user = await userQueue.sendEvent('get', {email: ctx.state.user.email});
    ctx.body = user;
  } catch (err) {
    console.log(err);
    ctx.status = 500;
  }
});

router.post('/', async (ctx, next) => {
  try {
    let userQueue = microserviceKit.amqpKit.getQueue('user');
    let user = await userQueue.sendEvent('create', ctx.request.body);
    ctx.status = 200;
  } catch (err) {
    console.log(err);
    if (err.code = 11000) {
      ctx.status = 404;
    } else {
      ctx.status = 500;      
    }
  }
});


module.exports = router;
