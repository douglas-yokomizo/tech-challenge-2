import mongoose from 'mongoose' // Import the mongoose library for MongoDB interaction
import { env } from '../env' // Import the validated environment variables

// Function to connect to the MongoDB database
export const connectToDatabase = async () => {
  try {
    // Attempt to connect to the database using the URI from the environment variables
    await mongoose.connect(env.MONGO_URI, {})
    console.log('Connected to MongoDB') // Log a success message upon successful connection
  } catch (err) {
    // Log an error message if the connection fails
    console.error('Failed to connect to MongoDB', err)
  }
}
