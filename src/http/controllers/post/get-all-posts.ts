import { Request, Response, NextFunction } from 'express'
import { makeGetAllPostsUseCase } from '../../../use-cases/factory/make-get-all-posts-usecase'

// Get all posts
export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const getAllPostsUseCase = makeGetAllPostsUseCase()

  getAllPostsUseCase
    .execute()
    .then((posts) => res.status(200).send(posts))
    .catch(next) // Pass the error to the error handling middleware
}
