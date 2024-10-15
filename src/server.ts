import app from './app' // Importing the app from the source folder
import dotenv from 'dotenv' // Importing dotenv to manage environment variables
import { env } from './env' // Importing environment variables from the .env file
import { setupSwagger } from './middleware/swagger' // Importing the Swagger setup function
import { connectToDatabase } from './db/database' // Importing the database connection function

dotenv.config() // Loading environment variables from the .env file

/// Setup Swagger
setupSwagger(app)

// Connecting to MongoDB
connectToDatabase()

// Starting the server and listening on the specified port
app.listen(env.PORT, '0.0.0.0', () => {
  console.log(`Server is running at http://localhost:${env.PORT}`) // Log message indicating the server is running
})
