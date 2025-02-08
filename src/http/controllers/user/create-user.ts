import { Request, Response } from 'express' // Import Request, Response, and NextFunction types from express
import { z } from 'zod' // Import zod for schema validation
import { makeCreateUseCase } from '../../../use-cases/factory/make-create-users-usecase' // Importing the factory function to create the use case for creating users
import { asyncHandler } from '../../../middleware/asyncHandler' // Importing middleware for handling async operations

// Create a new user
export const createUser = asyncHandler(async (req: Request, res: Response) => {
  // Define the schema for validating request body
  const registreBodySchema = z.object({
    name: z.string().min(1, 'Title is required'), // Name must be a non-empty string
    admin: z.boolean(),
  })

  // Parse and validate the request body against the schema asynchronously
  const { name, admin } = await registreBodySchema.parseAsync(req.body)
  const createUserUseCase = makeCreateUseCase() // Creating an instance of the use case for creating users

  // Handle the creation of the user and wait for the result
  const returnUser = await createUserUseCase.handler({ name, admin })

  // Send a 201 Created response with the created user
  res.status(201).send(returnUser)
})
