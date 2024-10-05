import { Request, Response } from 'express' // Import Request and Response types from express
import { makeGetAllPostsUseCase } from '../../../use-cases/factory/make-get-all-posts-usecase' // Importing the factory function to create the use case for fetching all posts

// Get all posts
export const getAllPosts = async (req: Request, res: Response) => {
  const getAllPostsUseCase = makeGetAllPostsUseCase() // Creating an instance of the use case for getting all posts
  const posts = await getAllPostsUseCase.execute() // Executing the use case to retrieve posts
  return res.status(200).json(posts) // Responding with a 200 status and the list of posts
}
