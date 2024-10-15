/* eslint-disable no-undef */

import 'dotenv/config' // Loads environment variables from the .env file
import request from 'supertest' // Import the supertest library for HTTP assertions
import mongoose from 'mongoose' // Import mongoose for database interactions
import app from '../../../../app' // Import the application instance
import Post, { PostType } from '../../../../models/post.model' // Import the Post model
import { env } from '../../../../env' // Import environment variables

jest.setTimeout(30000)

// MongoDB URI for testing, defaults to a local instance if not provided
const mongoUri =
  env.MONGO_URI || 'mongodb://localhost:27017/tech-challenge-2-test'

// Connect to MongoDB before running the tests
beforeAll(async () => {
  console.log('Connecting to MongoDB...')
  await mongoose.connect(mongoUri) // Establish connection to the database
  console.log('Connected to MongoDB')
}, 30000) // Increase timeout to 30 seconds for connection

describe('Find Post by ID', () => {
  let postId: string // Variable to hold the ID of the post

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

  // Test case for handling a non-existent post ID
  it('should return 404 if post ID is not found', async () => {
    const nonExistentId = new mongoose.Types.ObjectId().toString() // Generate a new non-existent ID
    const res = await request(app).get(`/posts/${nonExistentId}`) // Attempt to retrieve the post
    expect(res.statusCode).toEqual(404) // Check if the response status code is 404 (Not Found)
    expect(res.body).toHaveProperty('message', `ID ${nonExistentId} not found`) // Check the error message
  })

  // Test case for handling an invalid post ID format
  it('should return 400 for invalid post ID', async () => {
    const invalidId = '12345' // Invalid ID format
    const res = await request(app).get(`/posts/${invalidId}`) // Attempt to retrieve the post
    expect(res.statusCode).toEqual(400) // Check if the response status code is 400 (Bad Request)
  })

  // Test case for handling errors when finding a post by ID
  it('should handle error when finding a post by ID', async () => {
    jest.spyOn(Post, 'findById').mockImplementationOnce(() => {
      throw new Error('Database error') // Simulate a database error
    })
    const res = await request(app).get(`/posts/${postId}`) // Attempt to retrieve the post
    expect(res.statusCode).toEqual(500) // Check if the response status code is 500 (Internal Server Error)
  })

  // Test case for successfully finding a post by its ID
  it('should return 200 and the post if the post ID is found', async () => {
    const res = await request(app).get(`/posts/${postId}`) // Attempt to retrieve the post
    expect(res.statusCode).toEqual(200) // Check if the response status code is 200 (OK)
    expect(res.body).toHaveProperty('title', 'Test Post') // Check if the title matches
    expect(res.body).toHaveProperty('content', 'This is a test post') // Check if the content matches
  })
})
