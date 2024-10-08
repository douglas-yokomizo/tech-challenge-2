import { Request, Response, NextFunction } from 'express' // Importing types from Express for request handling

// Middleware to handle asynchronous route handlers
export const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    // Wrapping the asynchronous function in a promise
    Promise.resolve(fn(req, res, next)).catch(next) // Catching any errors and passing them to the next middleware
  }
