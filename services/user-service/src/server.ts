import app from './app'
import { env } from './env'
import { connectToDatabase } from './db/database'

// Connect to MongoDB
connectToDatabase()

// Start the server
const port = env.PORT
app.listen(port, () => {
  console.log(`User service is running on port ${port}`)
}) 
