import mongoose from 'mongoose'
import { env } from '../env'

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(env.MONGO_URI, {})
    console.log('User Service: Connected to MongoDB')
  } catch (err) {
    console.error('User Service: Failed to connect to MongoDB', err)
  }
} 
