/* eslint-disable no-undef */

import 'dotenv/config' // Load environment variables from .env file
import request from 'supertest' // Import supertest for making HTTP assertions
import mongoose from 'mongoose' // Import mongoose for MongoDB interactions
import app from '../app' // Import the Express application
import { env } from '../env' // Import environment variables

// Define the MongoDB connection URI, using the environment variable or a default value
const mongoUri =
  env.MONGO_URI || 'mongodb://localhost:27017/tech-challenge-2-test'

// Run this setup code before all tests
beforeAll(async () => {
  try {
    console.log('Connecting to MongoDB...') // Log message for connection attempt
    await mongoose.connect(mongoUri) // Connect to the MongoDB database
    console.log('Connected to MongoDB') // Log success message
  } catch (error) {
    console.error('Error connecting to MongoDB:', error) // Log any connection errors
  }
}, 30000) // Set a timeout of 30 seconds for the connection

describe('Post Routes', () => {
  // Test case for creating a new post
  it('should create a new post', async () => {
    const res = await request(app).post('/posts').send({
      // Make a POST request to create a post
      title: 'Test Post', // Set the title of the post
      content: 'This is a test post', // Set the content of the post
    })

    // Assertions to verify the response
    expect(res.statusCode).toEqual(201) // Check that the response status code is 201 (Created)
    expect(res.body).toHaveProperty('_id') // Check that the response body has an '_id' property
    expect(res.body.title).toBe('Test Post') // Verify that the title in the response matches the expected title
  })
})
