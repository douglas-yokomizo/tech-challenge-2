import mongoose from 'mongoose' // Importing the mongoose library for MongoDB connection
import app from './src/app' // Importing the app from the source folder
import dotenv from 'dotenv' // Importing dotenv to manage environment variables
import { env } from './src/env' // Importing environment variables from the env file

dotenv.config() // Loading environment variables from the .env file

// Connecting to MongoDB using the connection URI from the environment variables
mongoose
  .connect(env.MONGO_URI, {})
  .then(() => {
    console.log('Connected to MongoDB') // Log message on successful connection
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err) // Log error message on connection failure
  })

// Starting the server and listening on the specified port
app.listen(env.PORT, () => {
  console.log(`Server is running at http://localhost:${env.PORT}`) // Log message indicating the server is running
})
