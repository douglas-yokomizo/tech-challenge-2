import { UserRepository } from '../../repositories/user.repository' // Importing the UserRepository for database operations
import { createUsersCase } from '../create-users-usecase' // Importing the createUsersCase use case

export function makeCreateUseCase() {
  const userRepository = new UserRepository() // Creating an instance of UserRepository
  const createUserRepository = new createUsersCase(userRepository) // Creating an instance of createUsersCase with the user repository
  return createUserRepository // Returning the instance of createUsersCase
}
