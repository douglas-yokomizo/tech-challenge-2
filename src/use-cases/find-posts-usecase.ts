import { PostRepository } from '../repositories/post.repository' // Importing the PostRepository for database operations

export class FindPostsCase {
  constructor(private postRepository: PostRepository) {} // Injecting the PostRepository dependency

  async handler(id: string) { // Method to handle finding a post by its ID
    const post = await this.postRepository.findById(id) // Awaiting the result of the findById method on the repository
    return post // Returning the found post
  }
}