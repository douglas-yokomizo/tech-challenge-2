/* eslint-disable no-undef */

import mongoose from 'mongoose' // Import mongoose for database interaction
import app from '../../app' // Import the application instance
import { setupSwagger } from '../../middleware/swagger' // Import the Swagger setup function

jest.mock('../../middleware/swagger') // Mock the Swagger middleware module

beforeAll(async () => {
  // Setting environment variables for tests
  process.env.MONGO_URI = 'mongodb://localhost:27017/tech-challenge' // Test database URL
  process.env.PORT = '3001' // Set the port for the application
})

// Mock console.error to prevent actual error logging during tests
const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

afterAll(async () => {
  await mongoose.connection.close() // Close the database connection after tests
  consoleErrorSpy.mockRestore() // Restore the original console.error implementation
})

describe('Server Setup', () => {
  it('should set up Swagger', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('../../server') // Initialize the server

    // Verify that the setupSwagger function was called with the app instance
    expect(setupSwagger).toHaveBeenCalledWith(app)
  })
})
