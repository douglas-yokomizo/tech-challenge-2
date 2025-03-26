import mongoose from 'mongoose'
import { env } from '../env'

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(env.MONGO_URI, {})
    console.log('Post Service: Connected to MongoDB')
  } catch (err) {
    console.error('Post Service: Failed to connect to MongoDB', err)
  }
} 
