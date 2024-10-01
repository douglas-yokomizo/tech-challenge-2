import { Router } from 'express'
import {
  getAllPosts,
  createPost,
  getPostById,
  updatePostById,
  deletePostById,
} from '../controllers/post.controller'

const router = Router()

// Get all posts
router.get('/', getAllPosts)

// Create a new post
router.post('/', createPost)

// Get a single post by ID
router.get('/:id', getPostById)

// Update a post by ID
router.patch('/:id', updatePostById)

// Delete a post by ID
router.delete('/:id', deletePostById)

export default router
