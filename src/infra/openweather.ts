import dotenv from "dotenv";

dotenv.config();

const openWeatherApiKey = process.env.OPEN_WEATHER_API_KEY as string;

export async function getWeatherByCity(city: string) {
  console.log(openWeatherApiKey);
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApiKey}`,
  );
  const data = await response.json();
  return data;
}
