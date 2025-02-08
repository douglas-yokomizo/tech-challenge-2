import { Request, Response, NextFunction } from 'express' // Import Request, Response, and NextFunction types from express
import { makeUpdateUserUseCase } from '../../../use-cases/factory/make-update-user-usecase' // Importing the factory function to create the use case for updating users
import { asyncHandler } from '../../../middleware/asyncHandler' // Importing middleware for handling async operations
import { validateObjectId } from '../../../middleware/validateObjectId' // Importing middleware for validating ObjectId format
import { z } from 'zod' // Importing Zod for schema validation

// Defining the Zod validation schema for the user update data
const updateUserSchema = z.object({
  name: z.string().min(1, { message: 'Title cannot be empty' }), // Title must be a non-empty string
  admin: z.string().min(1, { message: 'Content cannot be empty' }), // Content must be a non-empty string
})

// Middleware to validate update data using Zod
const validateUpdateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = updateUserSchema.safeParse(req.body) // Parsing and validating the request body
  if (!result.success) {
    return res.status(400).json({ message: result.error.errors }) // Responds with 400 if validation fails
  }
  next() // Proceed to the next middleware if validation passes
}

// Update a user by ID
export const updateUserById = [
  validateObjectId, // Applying the ObjectId validation middleware
  validateUpdateUser, // Applying the Zod validation middleware
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params // Extracting the ID from the request parameters
    const updateData = req.body // Extracting update data from the request body
    const updateUserUseCase = makeUpdateUserUseCase() // Creating an instance of the use case for updating a user
    const updatedUser = await updateUserUseCase.execute(id, updateData) // Executing the update operation

    // Check if the user was found and updated
    if (!updatedUser) {
      return res.status(404).json({ message: `ID ${id} not found` }) // Responds with 404 if the user is not found
    }

    return res.status(200).json(updatedUser) // Responds with 200 and the updated user
  }),
]
