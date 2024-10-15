/* eslint-disable no-undef */

// Importing necessary modules
import mongoose from 'mongoose'
import { connectToDatabase } from '../../db/database'
import { env } from '../../env'

// Mocking mongoose to control its behavior during tests
jest.mock('mongoose', () => ({
  connect: jest.fn(),
}))

describe('connectToDatabase', () => {
  // Spy on console.log and console.error to check log outputs
  const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation()
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

  // Clear mocks after each test
  afterEach(() => {
    jest.clearAllMocks()
  })

  // Restore the original console methods after all tests
  afterAll(() => {
    consoleLogSpy.mockRestore()
    consoleErrorSpy.mockRestore()
  })

  // Test case for successful connection to MongoDB
  it('should log a success message when connected to MongoDB', async () => {
    // Mocking mongoose.connect to resolve successfully
    ;(mongoose.connect as jest.Mock).mockResolvedValueOnce(undefined)

    // Call the function to test
    await connectToDatabase()

    // Check if mongoose.connect was called with the correct URI
    expect(mongoose.connect).toHaveBeenCalledWith(env.MONGO_URI, {})
    // Check if the success message was logged
    expect(console.log).toHaveBeenCalledWith('Connected to MongoDB')
  })

  // Test case for failed connection to MongoDB
  it('should log an error message when failed to connect to MongoDB', async () => {
    const error = new Error('Connection failed')(
      // Simulate an error
      // Mocking mongoose.connect to reject with an error
      mongoose.connect as jest.Mock,
    ).mockRejectedValueOnce(error)

    // Call the function to test
    await connectToDatabase()

    // Check if mongoose.connect was called with the correct URI
    expect(mongoose.connect).toHaveBeenCalledWith(env.MONGO_URI, {})
    // Check if the error message was logged
    expect(console.error).toHaveBeenCalledWith(
      'Failed to connect to MongoDB',
      error,
    )
  })
})
