import { Request, Response } from 'express' // Import Request and Response types from express
import { z } from 'zod' // Import zod for schema validation
import { makeCreateUseCase } from '../../../use-cases/factory/make-create-posts-usecase' // Importing the factory function to create the use case for creating posts

// Create a new post
export const createPost = async (req: Request, res: Response) => {
  // Define the schema for validating request body
  const registreBodySchema = z.object({
    title: z.string(), // Title must be a string
    content: z.string(), // Content must be a string
  })

  // Parse and validate the request body against the schema
  const { title, content } = registreBodySchema.parse(req.body)

  const createPostUseCase = makeCreateUseCase() // Creating an instance of the use case for creating posts

  // Handle the creation of the post and wait for the result
  const returnPost = await createPostUseCase.handler({ title, content })
  // Send a 201 Created response with the created post
  return res.status(201).send(returnPost)
}
