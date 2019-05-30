import passport from 'passport';
import passportLocal from 'passport-local';
// Models = require('./models.js'),
import passportJWT from 'passport-jwt';

const LocalStrategy = passportLocal.Strategy;
var Users = Models.User;
var JWTStrategy = passportJWT.Strategy;
var ExtractJWT = passportJWT.ExtractJwt;

passport.use(new LocalStrategy({
  usernameField : 'username',
  passwordField : 'uassword'
}, (username, password, callback) => {

  Users.findOne({Username : username}, (error, user) => {
    if (error) {
      console.log(error);
      return callback(error);
    }
    if (!user) {
      console.log('Incorrect username');
      return callback(null, false, {message : "Incorrect username or password"});
    }
    console.log('finished');
    return callback(null,  user);
  });
}));

passport.use(new JWTStrategy({
  jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey : process.env.JWT_SECRET_KEY
}, (jwtPayload, callback) => {
  return Users.findById(jwtPayload._id)
  .then((user) => {
    return callback(null, user);
  })
  .catch((error) => {
    return callback(error)
  });
}));
