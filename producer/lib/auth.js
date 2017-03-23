const passport = require('koa-passport');
const microserviceKit = require('../lib/microservice-kit');
const LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy({
                                  "usernameField": "email",
                                  "passwordField": "password"
                                }, async (email, password, done) => {
  try {
    let userQueue = microserviceKit.amqpKit.getQueue('user');
    let cryptoQueue = microserviceKit.amqpKit.getQueue('crypto');

    let user = await userQueue.sendEvent('get', {email: email});
    let passwordComparison = await cryptoQueue.sendEvent('compareHash', {
                                                "password": password,
                                                "salt": user.salt,
                                                "hash": user.password
                                              });

    if (!passwordComparison)
      done('Wrong email or password.', false);

    //Success or is it?
    done(null, user);
  } catch (err) {
    done(err, false);
  }
}));

passport.serializeUser(async (user, done) => {
  if (user && user.email){
    done(null, user.email);
  } else {
    done('Something went wrong.');
  }
});

passport.deserializeUser(async (email, done) => {
  try {
    let userQueue = microserviceKit.amqpKit.getQueue('user');
    let user = await userQueue.sendEvent('get', {"email": email})
    done(null, user);
  } catch (err) {
    done(err);
  }
});


module.exports = passport;
