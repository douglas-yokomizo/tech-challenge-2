import { UserRepository } from '../../repositories/user.repository' // Importing the UserRepository for database operations
import { GetAllUsersUseCase } from '../get-all-users-usecase' // Importing the GetAllUsersUseCase

export function makeGetAllUsersUseCase() {
  const userRepository = new UserRepository() // Creating an instance of UserRepository
  return new GetAllUsersUseCase(userRepository) // Returning a new instance of GetAllUsersUseCase with the user repository
}
