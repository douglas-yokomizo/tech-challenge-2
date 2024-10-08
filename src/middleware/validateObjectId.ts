import { Request, Response, NextFunction } from 'express' // Importing types from Express for request handling
import { z } from 'zod' // Importing Zod for schema validation
import { Types } from 'mongoose' // Importing Types from Mongoose for ObjectId validation

// Custom refinement to validate ObjectId format
const objectIdRefinement = z
  .string() // Defining a string type
  .refine((id) => Types.ObjectId.isValid(id), {
    // Refining to check if the string is a valid ObjectId
    message: 'Invalid ID format', // Error message if validation fails
  })

// Middleware for validating ObjectId in request parameters
export const validateObjectId = (
  req: Request, // The HTTP request object
  res: Response, // The HTTP response object
  next: NextFunction, // The next middleware function
) => {
  // Defining the schema for validation
  const schema = z.object({
    id: objectIdRefinement, // Using the custom ObjectId refinement
  })

  try {
    schema.parse(req.params) // Parsing and validating request parameters against the schema
    next() // If valid, proceed to the next middleware
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message }) // Respond with 400 and error message
    }
    next(error) // Pass any other errors to the next error handler
  }
}
