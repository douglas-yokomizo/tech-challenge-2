/* eslint-disable no-undef */

import request from 'supertest' // Import supertest for testing HTTP requests
import express from 'express' // Import the express framework
import { deletePostById } from '../../http/controllers/post/deletePostById' // Import the controller for deleting a post
import { makeDeletePostUseCase } from '../../use-cases/factory/make-delete-post-usecase' // Import the factory function for creating a delete post use case

jest.mock('../../use-cases/factory/make-delete-post-usecase') // Mock the use case factory

const app = express() // Create a new Express application
app.use(express.json()) // Enable JSON request parsing
app.delete('/posts/:id', deletePostById) // Define the DELETE endpoint for posts

describe('DELETE /posts/:id', () => {
  it('should respond with a success message if the post was deleted', async () => {
    const mockDeletePostUseCase = {
      execute: jest.fn().mockResolvedValue(true), // Mock the use case to return success
    }
    ;(makeDeletePostUseCase as jest.Mock).mockReturnValue(mockDeletePostUseCase) // Mock the factory to return the mock use case

    const response = await request(app).delete(
      '/posts/123456789012345678901234', // Simulate deleting a post with a specific ID
    )

    expect(response.status).toBe(200) // Expect a 200 OK response
    expect(response.body).toEqual({ message: 'Post deleted successfully' }) // Check the success message
  })

  it('should respond with a 404 message if the post was not found', async () => {
    const mockDeletePostUseCase = {
      execute: jest.fn().mockResolvedValue(false), // Mock the use case to return failure
    }
    ;(makeDeletePostUseCase as jest.Mock).mockReturnValue(mockDeletePostUseCase) // Mock the factory to return the mock use case

    const response = await request(app).delete(
      '/posts/123456789012345678901234', // Simulate deleting a post with a specific ID
    )

    expect(response.status).toBe(404) // Expect a 404 Not Found response
    expect(response.body).toEqual({
      message: 'ID 123456789012345678901234 not found', // Check the error message
    })
  })
})
