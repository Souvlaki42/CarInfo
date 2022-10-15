import passportLocal from "passport-local";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { Translator } from "../config/api.js";
const LocalStrategy = passportLocal.Strategy;

export default function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({
        email: email
      }).then(user => {
        
        if (!user) {
          return done(null, false, { message: Translator.translate("That email is not registered") });
        }

        if(!user.verified){
            return done(null, false, {message: Translator.translate("That email is not verified")});
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: Translator.translate("Password incorrect") });
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};