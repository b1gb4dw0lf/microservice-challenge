const passport = require('koa-passport');
const microserviceKit = require('microservice-kit');
const LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy(async (email, password, done) => {
  let userQueue = microserviceKit.amqpKit.getQueue('user');
  let cryptoQueue = microserviceKit.amqpKit.getQueue('crypto');

  try {
    let user = await userQueue.sendEvent('get', {email: email});
    if (user.error) done('Wrong email or password.', false);

    let passwordComparison = await cryptoQueue.sendEvent('compareHash', {
                                                "password": password,
                                                "salt": user.salt,
                                                "hash": user.password
                                              });
    if (!passwordComparison || passwordComparison.error)
      done('Wrong email or password.', false);

    //Success or is it?
    done(null, user);
  } catch (err) {
    done(err, false);
  }
}));

passport.serializeUser(async (user, done) => {
  if (user && user.email)
    done(null, user.email);
  else
    done('Something went wrong.');
});

passport.deserializeUser(async (email, done) => {
  let userQueue = microserviceKit.amqpKit.getQueue('user');

  try {
    let user = await userQueue.sendEvent('get', {"email": email})
    done(null, user);
  } catch (err) {
    done(err);
  }
});
