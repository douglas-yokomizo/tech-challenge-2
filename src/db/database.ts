import mongoose from 'mongoose'
import { env } from '../env'

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(env.MONGO_URI, {})
    console.log('Connected to MongoDB')
  } catch (err) {
    console.error('Failed to connect to MongoDB', err)
  }
}
