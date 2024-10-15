/* eslint-disable no-undef */

import 'dotenv/config' // Load environment variables from the .env.test file
import request from 'supertest' // Import supertest for HTTP assertions
import mongoose from 'mongoose' // Import mongoose for MongoDB interactions
import app from '../../../../app' // Import the application instance
import Post, { PostType } from '../../../../models/post.model' // Import the Post model
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

describe('Update Post by ID', () => {
  let postId: string // Variable to hold the post ID for testing

  // Create a new post before each test and store its ID
  beforeEach(async () => {
    const post = new Post({
      title: 'Test Post',
      content: 'This is a test post',
    })
    const savedPost: PostType = await post.save() // Explicitly type the saved post
    postId = savedPost._id.toString() // Store the post ID as a string
  })

  // Cleanup after each test
  afterEach(async () => {
    await Post.deleteMany({}) // Delete all posts from the database
  })

  // Test case for handling a non-existent post ID
  it('should return 404 if post ID is not found', async () => {
    jest.setTimeout(10000) // Set timeout to 10 seconds
    const nonExistentId = new mongoose.Types.ObjectId().toString() // Generate a random ID
    const res = await request(app).patch(`/posts/${nonExistentId}`).send({
      title: 'Updated Test Post',
      content: 'This is an updated test post',
    })
    expect(res.statusCode).toEqual(404) // Check for 404 status
    expect(res.body).toHaveProperty('message', `ID ${nonExistentId} not found`) // Check error message
  })

  // Test case for handling an invalid post ID format
  it('should return 400 for invalid post ID', async () => {
    jest.setTimeout(10000) // Set timeout to 10 seconds
    const invalidId = '12345' // Invalid ID format
    const res = await request(app).patch(`/posts/${invalidId}`).send({
      title: 'Updated Test Post',
      content: 'This is an updated test post',
    })
    expect(res.statusCode).toEqual(400) // Check for 400 status
  })

  // Test case for handling errors during post updates
  it('should handle error when updating a post by ID', async () => {
    jest.setTimeout(10000) // Set timeout to 10 seconds
    jest.spyOn(Post, 'findByIdAndUpdate').mockImplementationOnce(() => {
      throw new Error('Database error') // Simulate a database error
    })
    const res = await request(app).patch(`/posts/${postId}`).send({
      title: 'Updated Test Post',
      content: 'This is an updated test post',
    })
    expect(res.statusCode).toEqual(500) // Check for 500 status
  })

  // Test case for handling validation failures
  it('should return 400 if validation fails', async () => {
    jest.setTimeout(10000) // Set timeout to 10 seconds
    const res = await request(app).patch(`/posts/${postId}`).send({
      title: '', // Sending an empty title to trigger validation failure
      content: 'This is an updated test post',
    })
    expect(res.statusCode).toEqual(400) // Check for 400 status
    expect(res.body).toHaveProperty('message') // Ensure a message property exists
    expect(res.body.message[0]).toHaveProperty(
      'message',
      'Title cannot be empty', // Check the specific validation error message
    )
  })
})
