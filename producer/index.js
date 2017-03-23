/*
 * Libraries
 */
const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const microservice = require('./lib/microservice-kit');
const passport = require('./lib/auth');
const convert = require('koa-convert');
const session = require('koa-generic-session');


/*
 * Instance objects.
 */
const app = new Koa();
const router = new Router();


/*
 * Include Routers
 */
const index = require('./routers/index');
const user = require('./routers/user');
const sign = require('./routers/sign');


/*
 * Url Configurations
 */
router.use('/', index.routes());
router.use('/user', user.routes());
router.use('/sign', sign.routes());


/*
 * App configurations.
 */
app.keys = ['somesecretkey', 'iliketurtle'];
app
  .use(logger())
  .use(bodyParser())
  .use(convert(session()))
  .use(passport.initialize())
  .use(passport.session())
  .use(router.routes())
  .use(router.allowedMethods());


//Start Server
microservice.init()
  .then(() => {
    console.log('API is up and producing.');
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = app;
