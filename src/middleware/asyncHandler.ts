// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request, Response, NextFunction } from 'express' // Importing types from Express for request handling

// Middleware to handle asynchronous route handlers
export const asyncHandler =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-unsafe-function-type
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    // Wrapping the asynchronous function in a promise
    Promise.resolve(fn(req, res, next)).catch(next) // Catching any errors and passing them to the next middleware
  }
