import { PostRepository } from '../../repositories/post.repository' // Importing the PostRepository for database operations
import { UpdatePostUseCase } from '../update-post-usecase' // Importing the UpdatePostUseCase

export function makeUpdatePostUseCase() {
  const postRepository = new PostRepository() // Creating an instance of PostRepository
  return new UpdatePostUseCase(postRepository) // Returning a new instance of UpdatePostUseCase with the post repository
}
