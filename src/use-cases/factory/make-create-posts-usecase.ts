import { PostRepository } from '../../repositories/post.repository' // Importing the PostRepository for database operations
import { createPostsCase } from '../create-posts-usecase' // Importing the createPostsCase use case

export function makeCreateUseCase() {
  const postRepository = new PostRepository() // Creating an instance of PostRepository
  const createPostRepository = new createPostsCase(postRepository) // Creating an instance of createPostsCase with the post repository
  return createPostRepository // Returning the instance of createPostsCase
}
