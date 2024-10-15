/* eslint-disable no-undef */

import mongoose from 'mongoose' // Import mongoose for MongoDB interactions
import { PostRepository } from '../repositories/post.repository' // Import the PostRepository
import Post, { PostType } from '../models/post.model' // Import the Post model and its type

jest.mock('../models/post.model') // Mock the Post model for testing

describe('PostRepository', () => {
  let postRepository: PostRepository // Declare a variable for the PostRepository instance

  beforeAll(() => {
    postRepository = new PostRepository() // Initialize the PostRepository before all tests
  })

  // Test case for retrieving a post by ID
  it('should return a post if found by ID', async () => {
    const mockPost = new Post({
      // Create a mock post object
      _id: new mongoose.Types.ObjectId('123456789012345678901234'), // Set a specific ID for the mock post
      title: 'Test Post', // Set the title of the mock post
      content: 'This is a test post', // Set the content of the mock post
      createdAt: new Date(), // Set the creation date
      updatedAt: new Date(), // Set the update date
    }) as PostType

    // Mock the findById method to return the mock post
    ;(Post.findById as jest.Mock).mockResolvedValue(mockPost)

    // Call the method to get the post by ID
    const result = await postRepository.getPostById('123456789012345678901234')

    // Assertions to verify the method's behavior
    expect(Post.findById).toHaveBeenCalledWith('123456789012345678901234') // Check that findById was called with the correct ID
    expect(result).toEqual(mockPost) // Verify that the result matches the mock post
  })

  // Test case for retrieving a post that does not exist
  it('should return null if post is not found by ID', async () => {
    // Mock the findById method to return null
    ;(Post.findById as jest.Mock).mockResolvedValue(null)

    // Call the method to get the post by ID
    const result = await postRepository.getPostById('123456789012345678901234')

    // Assertions to verify the method's behavior
    expect(Post.findById).toHaveBeenCalledWith('123456789012345678901234') // Check that findById was called with the correct ID
    expect(result).toBeNull() // Verify that the result is null when the post is not found
  })
})
