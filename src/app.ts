import express from "express";
import userRouter from "./routes/userRoute.js";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import { sendMail } from "./infra/mailer.js";
import { getWeatherByCity } from "./infra/openweather.js";
import { generateText } from "./infra/gemini.js";
import passport from "./config/passport.js";
import { getCityFromCoordinates } from "./infra/googleGeocode.js";

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

const PORT = 3000;

async function sendWeatherUpdate() {
  const users = await User.find();

  for (let user of users) {
    let city = null;
    if (user.location) {
      city = user.location;
      console.log(`User ${user.name} has a city: ${city}`);
    } else if (user.lat && user.lon) {
      city = await getCityFromCoordinates(user.lat, user.lon);
    }
    if (city != null) {
      console.log(`Getting weather for ${city}`);
      try {
        const weather = await getWeatherByCity(city);
        console.log(`Weather for ${city}: ${weather.weather[0].description}`);
        const prompt = `The current weather in ${weather.name} is ${weather.weather[0].description} with a temperature of ${weather.main.temp}°C. Compose a humorous message regarding the weather. Incorporate the weather data in you message aswell`;
        const message = await generateText(prompt);
        // const message = "message here";

        const emailSubject = `Weather Update for ${user.location}`;
        const emailBody = `Ola ${user.name}!

              Here is your weather update:
              ${message}

              Stay prepared and have a great day!

              Regards,
              Your Weather App`;

        sendMail(user.email, emailSubject, emailBody);
      } catch (error) {
        console.error(`Failed to get weather for ${city}`);
        console.error(error);
      }
    } else {
      console.log(`User ${user.name} does not have a city`);
    }
  }
}

sendWeatherUpdate();

setInterval(sendWeatherUpdate, 3 * 1000 * 60 * 60);

app.listen(PORT, () => {
  console.log(`Weather app listening on port ${PORT}!`);
});
