import { Request, Response } from "express";
import User from "../models/User.js";
import { getWeatherByCity } from "../infra/openweather.js";
import jwt from "jsonwebtoken";

export async function registerUser(req: Request, res: Response) {
  try {
    const { name, email, password, location, lat, lon } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ name, email, password, location, lat, lon });
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("User Registration Failed:", error);
    res.status(500).json({ message: "Server Error" });
  }
}

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Get Users Failed:", error);
    res.status(500).json({ message: "Server Error" });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const upadtedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!upadtedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(upadtedUser);
  } catch (error) {
    console.error("Update User Failed:", error);
    res.status(500).json({ message: "Server Error" });
  }
}

export async function weatherDay(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.location) {
      return res.status(400).json({ message: "User location is not set" });
    }

    const weather = await getWeatherByCity(user.location);

    res.status(200).json(weather);
  } catch (error) {
    console.error("Get Weather Failed:", error);
    res.status(500).json({ message: "Server Error" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Login Failed:", error);
    res.status(500).json({ message: "Server Error" });
  }
}
