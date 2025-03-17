import User from "../models/User.js";
import { getWeatherByCity } from "./openweather.js";
import { getCityFromCoordinates } from "./googleGeocode.js";
import { sendMail } from "./mailer.js";
import { generateText } from "./gemini.js";

export async function sendWeatherUpdate() {
  const users = await User.find();

  for (let user of users) {
    let city = null;
    if (user.location) {
      city = user.location;
      console.log(`User ${user.name} has a city: ${city}`);
    } else if (user.lat && user.lon) {
      // the lat and lon can be directly used with the openweather api.
      // the google geocoding is only used due to the assignment requirements.
      city = await getCityFromCoordinates(user.lat, user.lon);
    }
    if (city != null) {
      console.log(`Getting weather for ${city}`);
      try {
        const weather = await getWeatherByCity(city);
        console.log(`Weather for ${city}: ${weather.weather[0].description}`);
        const prompt = `The current weather in ${weather.name} is ${weather.weather[0].description} with a temperature of ${weather.main.temp}°C. Compose a humorous message regarding the weather. Incorporate the weather data in you message aswell`;
        const message = await generateText(prompt);

        const emailSubject = `Weather Update for ${user.location}`;
        const emailBody = `Ola ${user.name}!

              Here is your weather update:
              ${message}

              Stay prepared and have a great day!

              Regards,
              Your Weather App`;

        await sendMail(user.email, emailSubject, emailBody);
      } catch (error) {
        console.error(`Failed to get weather for ${city}`);
        console.error(error);
      }
    } else {
      console.log(`User ${user.name} does not have a city`);
    }
  }
}
