import { UserRepository } from '../repositories/user.repository' // Importing the UserRepository for database operations
export class GetAllUsersUseCase {
  constructor(private userRepository: UserRepository) {} // Injecting the UserRepository dependency
  async execute() {
    // Method to execute the retrieval of all users
    return this.userRepository.getAllUsers() // Calling the getAllUsers method on the repository and returning the result
  }
}
