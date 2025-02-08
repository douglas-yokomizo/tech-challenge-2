import { UserRepository } from '../repositories/user.repository' // Importing the UserRepository for database operations

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {} // Injecting the UserRepository dependency

  async execute(id: string) {
    // Method to execute the deletion of a user by its ID
    return this.userRepository.deleteUserById(id) // Calling the deleteUserById method on the repository
  }
}
