const Router = require('koa-router');
const microserviceKit = require('../lib/microservice-kit');
const isAuthenticated = require('../lib/middlewares');

const router = new Router();


router.get('/', async (ctx, next) => {
  try {
    let badgeQueue = microserviceKit.amqpKit.getQueue('badge');
    let badges = await badgeQueue.sendEvent('get');
    ctx.body = badges;
  } catch (err) {
    console.log(err);
    ctx.throw(500);
  }
});

router.get('/slug', async (ctx, next) => {
  try {
    let badgeQueue = microserviceKit.amqpKit.getQueue('badge');
    let badges = await badgeQueue.sendEvent('getBySlug', {slug: this.params.slug});
    ctx.body = badges;
  } catch (err) {
    console.log(err);
    ctx.throw(500);
  }
});

router.post('/', isAuthenticated, async (ctx, next) => {
  try {
    let badgeQueue = microserviceKit.amqpKit.getQueue('badge');
    let badge = await badgeQueue.sendEvent('create', ctx.request.body);
    ctx.status = 200;
  } catch (err) {
    console.log(err);
    ctx.throw(500);
  }
});


module.exports = router;
