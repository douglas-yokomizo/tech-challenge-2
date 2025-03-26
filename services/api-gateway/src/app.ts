import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { setupProxies } from './proxy'

const app = express()

// Middleware
app.use(cors())
app.use(helmet())
app.use(express.json())

// Setup proxies to microservices
setupProxies(app)

// API Gateway health check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'UP',
    service: 'api-gateway',
    timestamp: new Date().toISOString()
  })
})

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong at the gateway!' })
})

export default app 
