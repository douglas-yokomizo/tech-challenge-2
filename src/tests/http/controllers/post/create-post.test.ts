/* eslint-disable no-undef */
import 'dotenv/config' // Loads environment variables from the .env.test file
import request from 'supertest'
import mongoose from 'mongoose'
import app from '../../../../app'
import { env } from '../../../../env'

// MongoDB URI for testing, defaults to a local instance if not provided
const mongoUri =
  env.MONGO_URI || 'mongodb://localhost:27017/tech-challenge-2-test'

// Connect to MongoDB before all tests
beforeAll(async () => {
  try {
    console.log('Connecting to MongoDB...')
    await mongoose.connect(mongoUri) // Establish connection to the database
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error) // Log any connection errors
  }
}, 30000) // Increase timeout to 30 seconds

// Clean up and close the MongoDB connection after all tests
afterAll(async () => {
  try {
    if (mongoose.connection.db) {
      console.log('Dropping database...') // Log that the database will be dropped
      await mongoose.connection.db.dropDatabase() // Drop the test database
    }
    console.log('Closing MongoDB connection...')
    await mongoose.connection.close() // Close the database connection
    console.log('MongoDB connection closed')
  } catch (error) {
    console.error('Error closing MongoDB connection:', error) // Log any closing errors
  }
}, 30000) // Increase timeout to 30 seconds

describe('Create Post', () => {
  // Test case for successfully creating a new post
  it('should create a new post', async () => {
    const res = await request(app).post('/posts').send({
      title: 'Test Post',
      content: 'This is a test post',
    })
    expect(res.statusCode).toEqual(201) // Check if the response status code is 201 (Created)
    expect(res.body).toHaveProperty('_id') // Check if the response body has an '_id' property
    expect(res.body.title).toBe('Test Post') // Verify that the title is correct
  })

  // Test case for invalid post creation (missing title)
  it('should return 400 for invalid post creation', async () => {
    const res = await request(app).post('/posts').send({
      title: '', // Invalid title
      content: 'This is a test post',
    })
    expect(res.statusCode).toEqual(400) // Check if the response status code is 400 (Bad Request)
  }, 30000) // Increase timeout to 30 seconds

  // Test case to handle errors when creating a post
  it('should handle error when creating a post', async () => {
    jest.spyOn(console, 'error').mockImplementationOnce(() => {}) // Mock console.error to suppress logging during the test
    jest.spyOn(mongoose.Model.prototype, 'save').mockImplementationOnce(() => {
      throw new Error('Database error') // Simulate a database error
    })
    const res = await request(app).post('/posts').send({
      title: 'Test Post',
      content: 'This is a test post',
    })
    expect(res.statusCode).toEqual(500) // Check if the response status code is 500 (Internal Server Error)
  }, 20000) // Increase timeout to 20 seconds
})
