import { Request, Response } from 'express' // Import Request and Response types from express
import { makeFindPostsCase } from '../../../use-cases/factory/make-find-posts-usecase' // Importing the factory function to create the use case for finding posts
import { validateObjectId } from '../../../middleware/validateObjectId' // Importing middleware for validating ObjectId format
import { asyncHandler } from '../../../middleware/asyncHandler' // Importing middleware for handling async operations

// Get a single post by ID
export const getPostById = [
  validateObjectId, // Applying ObjectId validation middleware
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params // Extracting the ID from request parameters

    const findPostsCase = makeFindPostsCase() // Creating an instance of the use case for finding a post

    // Fetching the post using the provided ID
    const post = await findPostsCase.handler(id)
    if (!post) {
      return res.status(404).json({ message: `ID ${id} not found` }) // Respond with 404 if the post is not found
    } else {
      return res.status(200).send(post) // Respond with the found post and a 200 status
    }
  }),
]
