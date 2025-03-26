import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import postRoutes from './routes/post.routes'

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Service health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'UP', service: 'post-service' })
})

// Routes
app.use('/api/posts', postRoutes)

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

export default app 
