import express from "express";
import userRouter from "./routes/userRoute.js";
import connectDB from "./config/db.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRouter);

// Mongoose DB Connection
connectDB();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Weather app listening on port ${PORT}!`);
});
