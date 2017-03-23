const Router = require('koa-router');
const microserviceKit = require('../lib/microservice-kit');
const passport = require('koa-passport');

const router = new Router();


router.post('/in', async (ctx, next) => {
  passport.authenticate('local', async (err, user, info, status) => {
    if (user === false) {
      ctx.status = 401;
    } else {
      ctx.status = 200; //TODO: Redirect.
      return ctx.login(user);
    }
  });
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
