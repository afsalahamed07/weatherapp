import express from "express";
import userRouter from "./routes/userRoute.js";
import connectDB from "./config/db.js";
import passport from "./config/passport.js";
import { sendWeatherUpdate } from "./infra/weatherUtil.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const publicRoutes = ["/users/login", "/users/register"];

  if (publicRoutes.includes(req.path)) {
    return next();
  }

  passport.authenticate("jwt", { session: false })(req, res, next);
});

app.use("/users", userRouter);

// Mongoose DB Connection
connectDB();

sendWeatherUpdate();

setInterval(sendWeatherUpdate, 3 * 1000 * 60 * 60);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Weather app listening on port ${PORT}!`);
});
