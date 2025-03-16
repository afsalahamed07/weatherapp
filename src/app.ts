import express from "express";
import userRouter from "./routes/userRoute.js";
import connectDB from "./config/db.js";
import passport from "./config/passport.js";
import { sendWeatherUpdate } from "./infra/weatherUtil.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use((req, res, next) => {
  const publicRoutes = ["/users/login", "/users/register", "/"];

  if (publicRoutes.includes(req.path)) {
    return next();
  }

  passport.authenticate("jwt", { session: false })(req, res, next);
});

// this is to check deployment in vercel
app.get("/", (req, res) => {
  res.send("Welcome to the Weather API");
});

app.use("/users", userRouter);

export default app;

if (process.env.NODE_ENV !== "production") {
  try {
    await connectDB();
  } catch (error) {
    console.error("Error connecting to database:", error);
  }

  try {
    sendWeatherUpdate();
  } catch (error) {
    console.error("Error sending weather update:", error);
  }

  setInterval(sendWeatherUpdate, 3 * 1000 * 60 * 60);
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
