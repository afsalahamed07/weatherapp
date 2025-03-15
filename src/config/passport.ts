import {
  Strategy as JwtStratergy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import passport from "passport";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET as string,
};

passport.use(
  new JwtStratergy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      console.error("Error authenticating user:", error);
      return done(error, false);
    }
  }),
);

export default passport;
