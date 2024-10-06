import { PostRepository } from '../../repositories/post.repository' // Importing the PostRepository for database operations
import { GetAllPostsUseCase } from '../get-all-posts-usecase' // Importing the GetAllPostsUseCase

export function makeGetAllPostsUseCase() {
  const postRepository = new PostRepository() // Creating an instance of PostRepository
  return new GetAllPostsUseCase(postRepository) // Returning a new instance of GetAllPostsUseCase with the post repository
}
