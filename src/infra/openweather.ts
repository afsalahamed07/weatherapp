import dotenv from "dotenv";

dotenv.config();

const openWeatherApiKey = process.env.OPEN_WEATHER_API_KEY as string;

export async function getWeatherByCity(city: string) {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApiKey}&units=metric`,
  );

  // make sure the request was successful. And bad result is returned
  if (!response.ok) {
    throw new Error("Failed to fetch weather");
  }

  const data = await response.json();
  return data;
}
