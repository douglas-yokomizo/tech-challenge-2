/* eslint-disable no-undef */

import { UpdatePostUseCase } from '../../use-cases/update-post-usecase'
import { PostRepository } from '../../repositories/post.repository'
import { PostType } from '../../models/post.model'
import request from 'supertest'
import express from 'express'
import { updatePostById } from '../../http/controllers/post/update-post'
import { makeUpdatePostUseCase } from '../../use-cases/factory/make-update-post-usecase'

// Mocking the PostRepository
const mockPostRepository = {
  updatePostById: jest.fn(),
}

jest.mock('../../use-cases/factory/make-update-post-usecase')

const app = express()
app.use(express.json())
app.put('/posts/:id', updatePostById)

describe('UpdatePostUseCase', () => {
  let updatePostUseCase: UpdatePostUseCase

  beforeEach(() => {
    updatePostUseCase = new UpdatePostUseCase(
      mockPostRepository as unknown as PostRepository,
    )
  })

  it('should update a post by ID', async () => {
    const postId = '12345'
    const updateData: Partial<PostType> = {
      title: 'Updated Title',
      content: 'Updated Content',
    }
    const mockUpdatedPost = { _id: postId, ...updateData }

    // Mocking the updatePostById method to return the updated post
    mockPostRepository.updatePostById.mockResolvedValue(mockUpdatedPost)

    const result = await updatePostUseCase.execute(postId, updateData)

    expect(mockPostRepository.updatePostById).toHaveBeenCalledWith(
      postId,
      updateData,
    )
    expect(result).toEqual(mockUpdatedPost)
  })

  it('should return null if post is not found', async () => {
    const postId = '12345'
    const updateData: Partial<PostType> = {
      title: 'Updated Title',
      content: 'Updated Content',
    }

    // Mocking the updatePostById method to return null
    mockPostRepository.updatePostById.mockResolvedValue(null)

    const result = await updatePostUseCase.execute(postId, updateData)

    expect(mockPostRepository.updatePostById).toHaveBeenCalledWith(
      postId,
      updateData,
    )
    expect(result).toBeNull()
  })

  it('should handle errors', async () => {
    const postId = '12345'
    const updateData: Partial<PostType> = {
      title: 'Updated Title',
      content: 'Updated Content',
    }

    // Mocking the updatePostById method to throw an error
    mockPostRepository.updatePostById.mockRejectedValue(
      new Error('Database error'),
    )

    await expect(updatePostUseCase.execute(postId, updateData)).rejects.toThrow(
      'Database error',
    )
  })

  it('should respond with the updated post and a 200 status', async () => {
    const mockUpdatedPost = {
      id: '123456789012345678901234',
      title: 'Updated Title',
      content: 'Updated Content',
    }

    const mockUpdatePostUseCase = {
      execute: jest.fn().mockResolvedValue(mockUpdatedPost),
    }
    ;(makeUpdatePostUseCase as jest.Mock).mockReturnValue(mockUpdatePostUseCase)

    const response = await request(app)
      .put('/posts/123456789012345678901234')
      .send({ title: 'Updated Title', content: 'Updated Content' })

    expect(response.status).toBe(200)
    expect(response.body).toEqual(mockUpdatedPost)
  })
})
