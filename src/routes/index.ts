import { Router } from 'express'
import postRoutes from './post.routes'

const router = Router()

// Use the post routes
router.use('/posts', postRoutes)

export default router
