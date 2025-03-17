# Weather App

A full-stack weather application that fetches current weather data, sends humorous weather update emails, and secures user endpoints with JWT-based authentication.

## Technologies

- **Backend:** Express, TypeScript, Node.js
- **Database:** MongoDB (using Mongoose)
- **Authentication:** Passport (JWT Strategy)
- **Email Service:** Nodemailer (SMTP)
- **External APIs:** OpenWeather API, Google Geocoding API, Gemini API (if applicable)
- **Scheduled Tasks:** Vercel Cron Jobs (daily execution on Free/Hobby plan)
- **Deployment:** Vercel (serverless functions with rewrites)

## Overview

- **User Management:**  
  Provides endpoints for user registration and login, secured via Passport JWT.
  
- **Weather Updates:**  
  Retrieves weather information from third-party APIs and sends weather update emails using Nodemailer.
  
- **Database Integration:**  
  Uses MongoDB (via Mongoose) for storing user data, with connection caching for serverless environments.
  
- **Scheduled Tasks:**  
  Implements Vercel Cron Jobs to trigger daily weather updates.
  
- **Deployment:**  
  Deployed as a serverless application on Vercel, with all HTTP traffic routed appropriately.

## Links

- **Deployed Server:** [Vercel deployment](https://your-app.vercel.app](https://weather-app-rouge-two-65.vercel.app)
