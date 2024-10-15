import mongoose from 'mongoose'
import { connectToDatabase } from '../../db/database'
import { env } from '../../env'

jest.mock('mongoose', () => ({
  connect: jest.fn(),
}))

describe('connectToDatabase', () => {
  const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation()
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

  afterEach(() => {
    jest.clearAllMocks()
  })

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
