import { Request, Response, NextFunction } from 'express' // Import Request, Response, and NextFunction types from express
import { makeUpdatePostUseCase } from '../../../use-cases/factory/make-update-post-usecase' // Importing the factory function to create the use case for updating posts
import { asyncHandler } from '../../../middleware/asyncHandler' // Importing middleware for handling async operations
import { validateObjectId } from '../../../middleware/validateObjectId' // Importing middleware for validating ObjectId format
import { z } from 'zod' // Importing Zod for schema validation

// Defining the Zod validation schema for the post update data
const updatePostSchema = z.object({
  title: z.string().min(1, { message: 'Title cannot be empty' }), // Title must be a non-empty string
  content: z.string().min(1, { message: 'Content cannot be empty' }), // Content must be a non-empty string
})

// Middleware to validate update data using Zod
const validateUpdatePost = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = updatePostSchema.safeParse(req.body) // Parsing and validating the request body
  if (!result.success) {
    return res.status(400).json({ message: result.error.errors }) // Responds with 400 if validation fails
  }
  next() // Proceed to the next middleware if validation passes
}

// Update a post by ID
export const updatePostById = [
  validateObjectId, // Applying the ObjectId validation middleware
  validateUpdatePost, // Applying the Zod validation middleware
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params // Extracting the ID from the request parameters
    const updateData = req.body // Extracting update data from the request body
    const updatePostUseCase = makeUpdatePostUseCase() // Creating an instance of the use case for updating a post
    const updatedPost = await updatePostUseCase.execute(id, updateData) // Executing the update operation

    // Check if the post was found and updated
    if (!updatedPost) {
      return res.status(404).json({ message: `ID ${id} not found` }) // Responds with 404 if the post is not found
    }

    return res.status(200).json(updatedPost) // Responds with 200 and the updated post
  }),
]
