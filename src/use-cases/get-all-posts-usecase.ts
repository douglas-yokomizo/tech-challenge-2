import { PostRepository } from '../repositories/post.repository' // Importing the PostRepository for database operations

export class GetAllPostsUseCase {
  constructor(private postRepository: PostRepository) {} // Injecting the PostRepository dependency

  async execute() { // Method to execute the retrieval of all posts
    return this.postRepository.getAllPosts() // Calling the getAllPosts method on the repository and returning the result
  }
}
