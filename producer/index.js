/*
 * Libraries
 */
const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const microservice = require('./lib/microservice-kit');


/*
 * Instance objects.
 */
const app = new Koa();
const router = new Router();


/*
 * Include Routers
 */
const index = require('./routers/index');


/*
 * Url Configurations
 */
router.use('/', index.routes());


/*
 * App configurations.
 */
app
  .use(logger())
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
