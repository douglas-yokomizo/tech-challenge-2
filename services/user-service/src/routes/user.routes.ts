import { Router, Request, Response } from 'express'
import User from '../models/user.model'
import { z } from 'zod'

const router = Router()

// Validation schema for user creation/update
const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  admin: z.boolean(),
})

// Get all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

// Get user by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' })
  }
})

// Create user
router.post('/', async (req: Request, res: Response) => {
  try {
    const validatedData = userSchema.parse(req.body)
    const user = new User(validatedData)
    await user.save()
    res.status(201).json(user)
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors })
    } else {
      res.status(500).json({ error: 'Failed to create user' })
    }
  }
})

// Update user
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const validatedData = userSchema.parse(req.body)
    const user = await User.findByIdAndUpdate(
      req.params.id,
      validatedData,
      { new: true }
    )
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json(user)
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors })
    } else {
      res.status(500).json({ error: 'Failed to update user' })
    }
  }
})

// Delete user
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json({ message: 'User deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' })
  }
})

export default router 
