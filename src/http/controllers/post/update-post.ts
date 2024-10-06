import { Request, Response } from 'express' // Import Request and Response types from express
import { makeUpdatePostUseCase } from '../../../use-cases/factory/make-update-post-usecase' // Importing the factory function to create the use case for updating posts
import { asyncHandler } from '../../../middleware/asyncHandler' // Importing middleware for handling async operations
import { validateObjectId } from '../../../middleware/validateObjectId' // Importing middleware for validating ObjectId format

// Update a post by ID
export const updatePostById = [
  validateObjectId, // Applying ObjectId validation middleware
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params // Extracting the ID from request parameters
    const updateData = req.body // Extracting the update data from the request body
    const updatePostUseCase = makeUpdatePostUseCase() // Creating an instance of the use case for updating a post
    const updatedPost = await updatePostUseCase.execute(id, updateData) // Executing the update operation

    // Check if the post was found and updated
    if (!updatedPost) {
      return res.status(404).json({ message: `ID ${id} not found` }) // Respond with 404 if the post is not found
    }

    // Respond with the updated post and a 200 status
    return res.status(200).json(updatedPost)
  }),
]
