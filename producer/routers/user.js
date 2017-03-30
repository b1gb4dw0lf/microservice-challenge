const Router = require('koa-router');
const microserviceKit = require('../lib/microservice-kit');
const isAuthenticated = require('../lib/middlewares');

const router = new Router();


router.get('/', isAuthenticated, async (ctx, next) => {
  try {
    let userQueue = microserviceKit.amqpKit.getQueue('user');
    let user = await userQueue.sendEvent('get', {email: ctx.state.user.email});
    ctx.body = user;
  } catch (err) {
    console.log(err);
    ctx.throw(500);
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
      ctx.throw(400);
    } else {
      ctx.throw(500);
    }
  }
});

router.get('/leaderboard', isAuthenticated, async(ctx, next) => {
  try {
    let userQueue = microserviceKit.amqpKit.getQueue('user');
    let leaderboard = await userQueue.sendEvent('getLeaderboard');
    ctx.body = leaderboard;
  } catch (error) {
    console.log(error);
    ctx.throw(500);
  }
});


module.exports = router;
