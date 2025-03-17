import app from "../src/app.js";
import connectDB from "../src/config/db.js";

try {
  await connectDB();
} catch (error) {
  console.error("Error connecting to database:", error);
}

export default app;
