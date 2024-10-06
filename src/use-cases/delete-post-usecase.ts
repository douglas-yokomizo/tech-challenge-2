import { PostRepository } from '../repositories/post.repository' // Importing the PostRepository for database operations

export class DeletePostUseCase {
  constructor(private postRepository: PostRepository) {} // Injecting the PostRepository dependency

  async execute(id: string) { // Method to execute the deletion of a post by its ID
    return this.postRepository.deletePostById(id) // Calling the deletePostById method on the repository
  }
}