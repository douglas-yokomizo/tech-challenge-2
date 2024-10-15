/* eslint-disable no-undef */

import { UpdatePostUseCase } from '../../use-cases/update-post-usecase' // Import the use case for updating a post
import { PostRepository } from '../../repositories/post.repository' // Import the Post repository interface
import { PostType } from '../../models/post.model' // Import the Post model type
import request from 'supertest' // Import supertest for making HTTP requests in tests
import express from 'express' // Import express for setting up the application
import { updatePostById } from '../../http/controllers/post/update-post' // Import the controller for updating a post
import { makeUpdatePostUseCase } from '../../use-cases/factory/make-update-post-usecase' // Import factory for creating the use case

// Mocking the PostRepository
const mockPostRepository = {
  updatePostById: jest.fn(), // Mock the updatePostById method
}

// Mock the factory function for creating the use case
jest.mock('../../use-cases/factory/make-update-post-usecase')

// Set up the express application
const app = express()
app.use(express.json())
app.put('/posts/:id', updatePostById) // Define the route for updating a post

describe('UpdatePostUseCase', () => {
  let updatePostUseCase: UpdatePostUseCase // Declare a variable for the use case

  beforeEach(() => {
    // Initialize the use case before each test with the mocked repository
    updatePostUseCase = new UpdatePostUseCase(
      mockPostRepository as unknown as PostRepository,
    )
  })

  it('should update a post by ID', async () => {
    const postId = '12345' // Define a sample post ID
    const updateData: Partial<PostType> = {
      // Define the data for updating the post
      title: 'Updated Title',
      content: 'Updated Content',
    }
    const mockUpdatedPost = { _id: postId, ...updateData } // Create a mock updated post

    // Mock the updatePostById method to return the updated post
    mockPostRepository.updatePostById.mockResolvedValue(mockUpdatedPost)

    const result = await updatePostUseCase.execute(postId, updateData) // Execute the use case

    // Check that the repository method was called with the correct parameters
    expect(mockPostRepository.updatePostById).toHaveBeenCalledWith(
      postId,
      updateData,
    )
    expect(result).toEqual(mockUpdatedPost) // Check that the result matches the expected updated post
  })

  it('should return null if post is not found', async () => {
    const postId = '12345' // Define a sample post ID
    const updateData: Partial<PostType> = {
      // Define the data for updating the post
      title: 'Updated Title',
      content: 'Updated Content',
    }

    // Mock the updatePostById method to return null
    mockPostRepository.updatePostById.mockResolvedValue(null)

    const result = await updatePostUseCase.execute(postId, updateData) // Execute the use case

    // Check that the repository method was called with the correct parameters
    expect(mockPostRepository.updatePostById).toHaveBeenCalledWith(
      postId,
      updateData,
    )
    expect(result).toBeNull() // Verify that the result is null
  })

  it('should handle errors', async () => {
    const postId = '12345' // Define a sample post ID
    const updateData: Partial<PostType> = {
      // Define the data for updating the post
      title: 'Updated Title',
      content: 'Updated Content',
    }

    // Mock the updatePostById method to throw an error
    mockPostRepository.updatePostById.mockRejectedValue(
      new Error('Database error'),
    )

    // Expect the use case execution to throw an error
    await expect(updatePostUseCase.execute(postId, updateData)).rejects.toThrow(
      'Database error',
    )
  })

  it('should respond with the updated post and a 200 status', async () => {
    const mockUpdatedPost = {
      // Create a mock updated post
      id: '123456789012345678901234',
      title: 'Updated Title',
      content: 'Updated Content',
    }

    // Mock the use case execution
    const mockUpdatePostUseCase = {
      execute: jest.fn().mockResolvedValue(mockUpdatedPost),
    }
    ;(makeUpdatePostUseCase as jest.Mock).mockReturnValue(mockUpdatePostUseCase)

    // Make a request to update the post
    const response = await request(app)
      .put('/posts/123456789012345678901234')
      .send({ title: 'Updated Title', content: 'Updated Content' })

    expect(response.status).toBe(200) // Check that the response status is 200
    expect(response.body).toEqual(mockUpdatedPost) // Verify that the response body matches the updated post
  })
})
