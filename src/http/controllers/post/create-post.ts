import { Request, Response, NextFunction } from 'express' // Import Request, Response, and NextFunction types from express
import { z } from 'zod' // Import zod for schema validation
import { makeCreateUseCase } from '../../../use-cases/factory/make-create-posts-usecase' // Importing the factory function to create the use case for creating posts
import { asyncHandler } from '../../../middleware/asyncHandler' // Importing middleware for handling async operations

// Create a new post
export const createPost = asyncHandler(async (req: Request, res: Response) => {
  // Define the schema for validating request body
  const registreBodySchema = z.object({
    title: z.string().min(1, 'Title is required'), // Title must be a non-empty string
    content: z.string().min(1, 'Content is required'), // Content must be a non-empty string
  })

  // Parse and validate the request body against the schema asynchronously
  const { title, content } = await registreBodySchema.parseAsync(req.body)
  const createPostUseCase = makeCreateUseCase() // Creating an instance of the use case for creating posts

  // Handle the creation of the post and wait for the result
  const returnPost = await createPostUseCase.handler({ title, content })

  // Send a 201 Created response with the created post
  res.status(201).send(returnPost)
})
