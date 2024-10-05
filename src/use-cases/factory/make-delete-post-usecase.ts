import { PostRepository } from '../../repositories/post.repository' // Importing the PostRepository for database operations
import { DeletePostUseCase } from '../delete-post-usecase' // Importing the DeletePostUseCase

export function makeDeletePostUseCase() {
  const postRepository = new PostRepository() // Creating an instance of PostRepository
  return new DeletePostUseCase(postRepository) // Returning a new instance of DeletePostUseCase with the post repository
}
