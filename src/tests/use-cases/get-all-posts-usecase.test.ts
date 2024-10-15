/* eslint-disable no-undef */

import { GetAllPostsUseCase } from '../../use-cases/get-all-posts-usecase' // Import the use case for retrieving all posts
import { PostRepository } from '../../repositories/post.repository' // Import the Post repository interface

describe('GetAllPostsUseCase', () => {
  let getAllPostsUseCase: GetAllPostsUseCase // Declare a variable for the use case
  let postRepository: PostRepository // Declare a variable for the post repository

  beforeEach(() => {
    postRepository = {
      getAllPosts: jest.fn().mockResolvedValue([
        // Mock the getAllPosts method to return an array of posts
        { id: '1', title: 'Post 1', content: 'Content 1' },
        { id: '2', title: 'Post 2', content: 'Content 2' },
      ]),
    } as unknown as PostRepository // Cast the mock to the PostRepository type

    getAllPostsUseCase = new GetAllPostsUseCase(postRepository) // Instantiate the use case with the mocked repository
  })

  it('should call getAllPosts on the repository', async () => {
    await getAllPostsUseCase.execute() // Execute the use case
    expect(postRepository.getAllPosts).toHaveBeenCalled() // Verify that the repository method was called
  })

  it('should return all posts', async () => {
    const posts = await getAllPostsUseCase.execute() // Execute the use case and store the returned posts
    expect(posts).toEqual([
      // Check that the returned posts match the expected values
      { id: '1', title: 'Post 1', content: 'Content 1' },
      { id: '2', title: 'Post 2', content: 'Content 2' },
    ])
  })
})
