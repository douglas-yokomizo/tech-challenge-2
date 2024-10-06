import { Request, Response } from 'express' // Import Request and Response types from express
import { makeDeletePostUseCase } from '../../../use-cases/factory/make-delete-post-usecase' // Importing the factory function to create the use case for deleting posts
import { asyncHandler } from '../../../middleware/asyncHandler' // Importing middleware for handling async operations
import { validateObjectId } from '../../../middleware/validateObjectId' // Importing middleware for validating ObjectId format

// Delete a post by ID
export const deletePostById = [
  validateObjectId, // Applying ObjectId validation middleware
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params // Extracting the ID from request parameters
    const deletePostUseCase = makeDeletePostUseCase() // Creating an instance of the use case for deleting a post
    const deletedPost = await deletePostUseCase.execute(id) // Executing the delete operation

    // Check if the post was found and deleted
    if (!deletedPost) {
      return res.status(404).json({ message: `ID ${id} not found` }) // Respond with 404 if the post is not found
    }

    // Respond with a success message if the post was deleted
    return res.status(200).json({ message: 'Post deleted successfully' })
  }),
]