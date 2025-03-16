import app from "../src/app.js";
import connectDB from "../src/config/db.js";
import { sendWeatherUpdate } from "../src/infra/weatherUtil.js";

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

export default app;
