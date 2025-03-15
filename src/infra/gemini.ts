import dontenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dontenv.config();

const apiKey = process.env.GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateText(prompt: string) {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating text:", error);
    throw error;
  }
}
