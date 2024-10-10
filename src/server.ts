import mongoose from 'mongoose' // Importing the mongoose library for MongoDB connection
import app from './app' // Importing the app from the source folder
import dotenv from 'dotenv' // Importing dotenv to manage environment variables
import { env } from './env' // Importing environment variables from the .env file
import { setupSwagger } from './middleware/swagger' // Importing the Swagger setup function

dotenv.config() // Loading environment variables from the .env file

/// Setup Swagger
setupSwagger(app)

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
app.listen(env.PORT, '0.0.0.0', () => {
  console.log(`Server is running at http://localhost:${env.PORT}`) // Log message indicating the server is running
})
