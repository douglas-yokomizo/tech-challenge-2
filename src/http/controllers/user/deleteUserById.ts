import { Request, Response } from 'express' // Import Request and Response types from express
import { makeDeleteUserUseCase } from '../../../use-cases/factory/make-delete-user-usecase' // Importing the factory function to create the use case for deleting users
import { asyncHandler } from '../../../middleware/asyncHandler' // Importing middleware for handling async operations
import { validateObjectId } from '../../../middleware/validateObjectId' // Importing middleware for validating ObjectId format

// Delete a user by ID
export const deleteUserById = [
  validateObjectId, // Applying ObjectId validation middleware
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params // Extracting the ID from request parameters
    const deleteUserUseCase = makeDeleteUserUseCase() // Creating an instance of the use case for deleting a user
    const deletedUser = await deleteUserUseCase.execute(id) // Executing the delete operation

    // Check if the user was found and deleted
    if (!deletedUser) {
      return res.status(404).json({ message: `ID ${id} not found` }) // Respond with 404 if the user is not found
    }

    // Respond with a success message if the user was deleted
    return res.status(200).json({ message: 'User deleted successfully' })
  }),
]
