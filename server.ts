import mongoose from 'mongoose'
import app from './src/app'
import dotenv from 'dotenv'

// For env File
dotenv.config()

const port = process.env.PORT || 8000
const mongoUri =
  process.env.MONGO_URI || 'mongodb://localhost:27017/tech-challenge-2'

mongoose
  .connect(mongoUri, {})
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err)
  })

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
