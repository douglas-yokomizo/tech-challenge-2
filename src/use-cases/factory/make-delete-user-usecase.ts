import { UserRepository } from '../../repositories/user.repository' // Importing the UserRepository for database operations
import { DeleteUserUseCase } from '../delete-user-usecase' // Importing the DeletePostUseCase

export function makeDeleteUserUseCase() {
  const userRepository = new UserRepository() // Creating an instance of UserRepository
  return new DeleteUserUseCase(userRepository) // Returning a new instance of DeletePostUseCase with the post repository
}
