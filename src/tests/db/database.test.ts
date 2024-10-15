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

  it('should log a success message when connected to MongoDB', async () => {
    ;(mongoose.connect as jest.Mock).mockResolvedValueOnce(undefined)

    await connectToDatabase()

    expect(mongoose.connect).toHaveBeenCalledWith(env.MONGO_URI, {})
    expect(console.log).toHaveBeenCalledWith('Connected to MongoDB')
  })

  it('should log an error message when failed to connect to MongoDB', async () => {
    const error = new Error('Connection failed')
    ;(mongoose.connect as jest.Mock).mockRejectedValueOnce(error)

    await connectToDatabase()

    expect(mongoose.connect).toHaveBeenCalledWith(env.MONGO_URI, {})
    expect(console.error).toHaveBeenCalledWith(
      'Failed to connect to MongoDB',
      error,
    )
  })
})
