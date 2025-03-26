import app from './app'
import { env } from './env'

// Start the server
const port = env.PORT
app.listen(port, () => {
  console.log(`API Gateway is running on port ${port}`)
  console.log(`User Service URL: ${env.USER_SERVICE_URL}`)
  console.log(`Post Service URL: ${env.POST_SERVICE_URL}`)
}) 
