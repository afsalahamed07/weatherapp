import express from "express";
import userRouter from "./routes/userRoute.js";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import { sendMail } from "./infra/mailer.js";
import { getWeatherByCity } from "./infra/openweather.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRouter);

// Mongoose DB Connection
connectDB();

const PORT = 3000;

const users = await User.find();

for (let user of users) {
  if (!user.location) {
    console.log(`User ${user.name} does not have a city`);
  } else {
    try {
      const weather = await getWeatherByCity(user.location);
      console.log(
        `Weather for ${user.location}: ${weather.weather[0].description}`,
      );
      sendMail(
        user.email,
        "Weather",
        `The weather in ${user.location} is ${weather.weather[0].description}`,
      );
    } catch (error) {
      console.error(`Failed to get weather for ${user.location}`);
    }
  }
}

app.listen(PORT, () => {
  console.log(`Weather app listening on port ${PORT}!`);
});
