import { PostRepository } from '../repositories/post.repository' // Importing the PostRepository for database operations

// Dependency inversion principle applied: high-level modules should not depend on low-level modules

export class createPostsCase {
  constructor(private postRepository: PostRepository) {} // Injecting the PostRepository dependency

  handler(post: { title: string; content: string }) {
    // Method to handle the creation of a post
    return this.postRepository.createPost(post) // Calling the createPost method on the repository
  }
}
