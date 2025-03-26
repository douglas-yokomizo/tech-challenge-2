import { Router, Request, Response } from 'express'
import Post from '../models/post.model'
import { z } from 'zod'

const router = Router()

// Validation schema for post creation/update
const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
})

// Get all posts
router.get('/', async (req: Request, res: Response) => {
  try {
    const posts = await Post.find()
    res.json(posts)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' })
  }
})

// Get post by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }
    res.json(post)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch post' })
  }
})

// Create post
router.post('/', async (req: Request, res: Response) => {
  try {
    const validatedData = postSchema.parse(req.body)
    const post = new Post(validatedData)
    await post.save()
    res.status(201).json(post)
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors })
    } else {
      res.status(500).json({ error: 'Failed to create post' })
    }
  }
})

// Update post
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const validatedData = postSchema.parse(req.body)
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      validatedData,
      { new: true }
    )
    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }
    res.json(post)
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors })
    } else {
      res.status(500).json({ error: 'Failed to update post' })
    }
  }
})

// Delete post
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id)
    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }
    res.json({ message: 'Post deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' })
  }
})

export default router 
