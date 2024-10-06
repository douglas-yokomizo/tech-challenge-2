import { PostRepository } from '../repositories/post.repository' // Importing the PostRepository for database operations
import { PostType } from '../models/post.model' // Importing the PostType model; adjust the path as necessary

export class UpdatePostUseCase {
  constructor(private postRepository: PostRepository) {} // Injecting the PostRepository dependency

  async execute(id: string, updateData: Partial<PostType>) { // Method to execute the update of a post by its ID
    return this.postRepository.updatePostById(id, updateData) // Calling the updatePostById method on the repository with the provided ID and update data
  }
}
