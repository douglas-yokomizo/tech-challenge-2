import { Request, Response, NextFunction } from 'express'
import { makeGetAllUsersUseCase } from '../../../use-cases/factory/make-get-all-users-usecase'

// Get all users
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const getAllUsersUseCase = makeGetAllUsersUseCase()

  getAllUsersUseCase
    .execute()
    .then((users) => res.status(200).send(users))
    .catch(next) // Pass the error to the error handling middleware
}
