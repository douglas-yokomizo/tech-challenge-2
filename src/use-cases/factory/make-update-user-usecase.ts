import { UserRepository } from '../../repositories/user.repository' // Importing the UserRepository for database operations
import { UpdateUserUseCase } from '../update-user-usecase' // Importing the UpdateUserUseCase

export function makeUpdateUserUseCase() {
  const userRepository = new UserRepository() // Creating an instance of UserRepository
  return new UpdateUserUseCase(userRepository) // Returning a new instance of UpdateUserUseCase with the User repository
}
