import { Router } from 'express'
import Post from '../models/post.model'

const router = Router()

// Get all posts
router.get('/', async (req, res) => {
  try {
    const allPosts = await Post.find()
    res.status(200).send(allPosts)
  } catch (error) {
    res.status(500).send(error)
  }
})

// Create a new post
router.post('/', async (req, res) => {
  try {
    const newPost = new Post(req.body)
    await newPost.save()
    res.status(201).send(newPost)
  } catch (error) {
    res.status(400).send(error)
  }
})

// Get a single post by ID
router.get('/:id', async (req, res) => {
  try {
    const postById = await Post.findById(req.params.id)
    if (!postById) {
      return res.status(404).send()
    }
    res.status(200).json(postById)
  } catch (error) {
    res.status(500).send(error)
  }
})

// Update a post by ID
router.patch('/:id', async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // return the updated post
      runValidators: true, // ensure that the update follows the schema
    })
    if (!updatedPost) {
      return res.status(404).send()
    }
    res.status(200).send(updatedPost)
  } catch (error) {
    res.status(400).send(error)
  }
})

// Delete a post by ID
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id)
    if (!post) {
      return res.status(404).send()
    }
    res.status(200).send(post)
  } catch (error) {
    res.status(500).send(error)
  }
})

export default router
