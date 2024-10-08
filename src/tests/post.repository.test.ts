import mongoose from 'mongoose'
import { PostRepository } from '../repositories/post.repository'
import Post, { PostType } from '../models/post.model'

jest.mock('../models/post.model')

describe('PostRepository', () => {
  let postRepository: PostRepository

  beforeAll(() => {
    postRepository = new PostRepository()
  })

  it('should return a post if found by ID', async () => {
    const mockPost = new Post({
      _id: new mongoose.Types.ObjectId('123456789012345678901234'),
      title: 'Test Post',
      content: 'This is a test post',
      createdAt: new Date(),
      updatedAt: new Date(),
    }) as PostType

    ;(Post.findById as jest.Mock).mockResolvedValue(mockPost)

    const result = await postRepository.getPostById('123456789012345678901234')

    expect(Post.findById).toHaveBeenCalledWith('123456789012345678901234')
    expect(result).toEqual(mockPost)
  })

  it('should return null if post is not found by ID', async () => {
    ;(Post.findById as jest.Mock).mockResolvedValue(null)

    const result = await postRepository.getPostById('123456789012345678901234')

    expect(Post.findById).toHaveBeenCalledWith('123456789012345678901234')
    expect(result).toBeNull()
  })
})
