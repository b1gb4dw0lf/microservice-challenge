/*
 * Libraries
 */
const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const microservice = require('./lib/microservice-kit');
const passport = require('koa-passport');
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


/*
 * Url Configurations
 */
router.use('/', index.routes());
router.use('/user', user.routes());


/*
 * App configurations.
 */
app.keys = ['somesecretkey', 'iliketurtle'];
app
  .use(logger())
  .use(convert(session()))
  .use(passport.initialize())
  .use(passport.session())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(bodyParser());


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
