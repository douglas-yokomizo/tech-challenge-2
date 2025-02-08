import { UserRepository } from '../repositories/user.repository' // Importing the UserRepository for database operations
import { UserType } from '../models/user.model' // Importing the UserType model; adjust the path as necessary
export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {} // Injecting the UserRepository dependency

  async execute(id: string, updateData: Partial<UserType>) {
    // Method to execute the update of a user by its ID
    return this.userRepository.updateUserById(id, updateData) // Calling the updateUserById method on the repository with the provided ID and update data
  }
}
