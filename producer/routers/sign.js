const Router = require('koa-router');
const microserviceKit = require('../lib/microservice-kit');
const passport = require('../lib/auth');

const router = new Router();


router.post('/in', async (ctx, next) => {
  return passport.authenticate('local', async (err, user, info) => {
    if (err) {
      console.log(err);
      ctx.throw(500);
    }

    console.log(info);

    if (user === false) {
      ctx.throw(401);
    } else {
      ctx.status = 200; //TODO: Redirect.
      return ctx.login(user);
    }
  })(ctx, next);
});

router.get('/out', async (ctx, next) => {
  try {
    let isAuthenticated = await ctx.isAuthenticated();
    if (isAuthenticated) {
      ctx.logout();
      ctx.status = 200; //TODO: Redirect on logout.
    }
  } catch (err) {
    ctx.status = 500;
    ctx.body = {"error": error}
  }
});


module.exports = router;
