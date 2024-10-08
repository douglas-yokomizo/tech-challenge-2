/* eslint-disable no-undef */

import { GetAllPostsUseCase } from '../../use-cases/get-all-posts-usecase'
import { PostRepository } from '../../repositories/post.repository'

describe('GetAllPostsUseCase', () => {
  let getAllPostsUseCase: GetAllPostsUseCase
  let postRepository: PostRepository

  beforeEach(() => {
    postRepository = {
      getAllPosts: jest.fn().mockResolvedValue([
        { id: '1', title: 'Post 1', content: 'Content 1' },
        { id: '2', title: 'Post 2', content: 'Content 2' },
      ]),
    } as unknown as PostRepository

    getAllPostsUseCase = new GetAllPostsUseCase(postRepository)
  })

  it('should call getAllPosts on the repository', async () => {
    await getAllPostsUseCase.execute()
    expect(postRepository.getAllPosts).toHaveBeenCalled()
  })

  it('should return all posts', async () => {
    const posts = await getAllPostsUseCase.execute()
    expect(posts).toEqual([
      { id: '1', title: 'Post 1', content: 'Content 1' },
      { id: '2', title: 'Post 2', content: 'Content 2' },
    ])
  })
})
