import { UserRepository } from '../repositories/user.repository' // Importing the UserRepository for database operations

// Dependency inversion principle applied: high-level modules should not depend on low-level modules

export class createUsersCase {
  constructor(private userRepository: UserRepository) {} // Injecting the UserRepository dependency

  handler(user: { name: string; admin: boolean }) {
    // Method to handle the creation of a user
    return this.userRepository.createUser(user) // Calling the createUser method on the repository
  }
}
