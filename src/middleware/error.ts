import { Request, Response, NextFunction } from 'express' // Importing types from Express for request handling
import { ZodError } from 'zod' // Importing ZodError for validation error handling
import { env } from '../env' // Importing environment variables

// Error handling middleware for Express
export const errorMiddleware = (
  error: Error, // The error object
  req: Request, // The HTTP request object
  res: Response, // The HTTP response object
  next: NextFunction, // The next middleware function
) => {
  // Check if the error is an instance of ZodError (validation error)
  if (error instanceof ZodError) {
    return res
      .status(400) // Respond with a 400 Bad Request status
      .send({ message: 'Validation error', errors: error.format() }) // Send validation errors
  }

  // Log the error to the console in development mode
  if (env.NODE_ENV === 'development') {
    console.error(error) // Print the error stack trace
  }

  // Handle other types of errors here if needed
  res.status(500).send({ message: 'Internal Server Error' }) // Respond with a 500 Internal Server Error status
}
