/* eslint-disable no-undef */

import request from 'supertest' // Import supertest for HTTP assertions
import mongoose from 'mongoose' // Import mongoose for MongoDB interactions
import app from '../../../../app' // Import the application instance
import Post from '../../../../models/post.model' // Import the Post model
import { env } from '../../../../env' // Import environment variables

// MongoDB URI for testing; defaults to a local instance if not provided
const mongoUri =
  env.MONGO_URI || 'mongodb://localhost:27017/tech-challenge-2-test'

// Connect to MongoDB before running the tests
beforeAll(async () => {
  console.log('Connecting to MongoDB...')
  await mongoose.connect(mongoUri) // Establish a connection to the database
  console.log('Connected to MongoDB')
}, 30000) // Increase timeout to 30 seconds for connection

// Cleanup after all tests are done
afterAll(async () => {
  if (mongoose.connection.db) {
    console.log('Dropping database...')
    await mongoose.connection.db.dropDatabase() // Drop the database for a clean slate
  }
  console.log('Closing MongoDB connection...')
  await mongoose.connection.close() // Close the connection to the database
  console.log('MongoDB connection closed')
}, 30000) // Increase timeout to 30 seconds for closing

describe('Get All Posts', () => {
  // Clear the database before each test
  beforeEach(async () => {
    await Post.deleteMany({}) // Delete all posts from the database
  })

  // Test case for retrieving all posts when no posts exist
  it('should return an empty array if no posts are found', async () => {
    const res = await request(app).get('/posts') // Make a GET request to retrieve posts
    expect(res.statusCode).toEqual(200) // Check if the response status code is 200 (OK)
    expect(res.body).toBeInstanceOf(Array) // Verify that the response body is an array
    expect(res.body.length).toBe(0) // Ensure the array is empty
  })

  // Test case for handling errors when retrieving posts
  it('should handle error when getting all posts', async () => {
    jest.spyOn(Post, 'find').mockImplementationOnce(() => {
      throw new Error('Database error') // Simulate a database error
    })
    const res = await request(app).get('/posts') // Make a GET request to retrieve posts
    expect(res.statusCode).toEqual(500) // Check if the response status code is 500 (Internal Server Error)
    expect(res.body).toHaveProperty('message', 'Internal Server Error') // Check the error message
  }, 10000) // Increase timeout to 10 seconds for this test
})
