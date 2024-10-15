/* eslint-disable no-undef */
import 'dotenv/config' // Loads environment variables from the .env.test file
import request from 'supertest'
import mongoose from 'mongoose'
import app from '../../../../app'
import Post, { PostType } from '../../../../models/post.model'
import { env } from '../../../../env'

// MongoDB URI for testing, defaults to a local instance if not provided
const mongoUri =
  env.MONGO_URI || 'mongodb://localhost:27017/tech-challenge-2-test'

// Connect to MongoDB before all tests
beforeAll(async () => {
  console.log('Connecting to MongoDB...')
  await mongoose.connect(mongoUri) // Establish connection to the database
  console.log('Connected to MongoDB')
}, 30000) // Increase timeout to 30 seconds

describe('Delete Post by ID', () => {
  let postId: string // Variable to hold the ID of the post to be deleted

  // Create a test post before each test
  beforeEach(async () => {
    const post = new Post({
      title: 'Test Post',
      content: 'This is a test post',
    })
    const savedPost: PostType = await post.save() // Save the post to the database
    postId = savedPost._id.toString() // Store the ID of the saved post
  })

  // Clean up the database after each test
  afterEach(async () => {
    await Post.deleteMany({}) // Delete all posts from the database
  })

  // Test case for deleting a post with a non-existent ID
  it('should return 404 if post ID is not found', async () => {
    const nonExistentId = new mongoose.Types.ObjectId().toString() // Generate a new non-existent ID
    const res = await request(app).delete(`/posts/${nonExistentId}`) // Attempt to delete the post
    expect(res.statusCode).toEqual(404) // Check if the response status code is 404 (Not Found)
    expect(res.body).toHaveProperty('message', `ID ${nonExistentId} not found`) // Check the error message
  })

  // Test case for handling an invalid post ID
  it('should return 400 for invalid post ID', async () => {
    const invalidId = '12345' // Invalid ID format
    const res = await request(app).delete(`/posts/${invalidId}`) // Attempt to delete the post
    expect(res.statusCode).toEqual(400) // Check if the response status code is 400 (Bad Request)
  })

  // Test case to handle errors when deleting a post by ID
  it('should handle error when deleting a post by ID', async () => {
    jest.spyOn(Post, 'findByIdAndDelete').mockImplementationOnce(() => {
      throw new Error('Database error') // Simulate a database error
    })
    const res = await request(app).delete(`/posts/${postId}`) // Attempt to delete the post
    expect(res.statusCode).toEqual(500) // Check if the response status code is 500 (Internal Server Error)
  })
})
