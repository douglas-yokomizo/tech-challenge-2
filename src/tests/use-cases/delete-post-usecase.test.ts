/* eslint-disable no-undef */

import request from 'supertest'
import express from 'express'
import { deletePostById } from '../../http/controllers/post/deletePostById' // Ajuste o caminho conforme necessário
import { makeDeletePostUseCase } from '../../use-cases/factory/make-delete-post-usecase'

jest.mock('../../use-cases/factory/make-delete-post-usecase')

const app = express()
app.use(express.json())
app.delete('/posts/:id', deletePostById)

describe('DELETE /posts/:id', () => {
  it('should respond with a success message if the post was deleted', async () => {
    const mockDeletePostUseCase = {
      execute: jest.fn().mockResolvedValue(true),
    }
    ;(makeDeletePostUseCase as jest.Mock).mockReturnValue(mockDeletePostUseCase)

    const response = await request(app).delete(
      '/posts/123456789012345678901234',
    )

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ message: 'Post deleted successfully' })
  })

  it('should respond with a 404 message if the post was not found', async () => {
    const mockDeletePostUseCase = {
      execute: jest.fn().mockResolvedValue(false),
    }
    ;(makeDeletePostUseCase as jest.Mock).mockReturnValue(mockDeletePostUseCase)

    const response = await request(app).delete(
      '/posts/123456789012345678901234',
    )

    expect(response.status).toBe(404)
    expect(response.body).toEqual({
      message: 'ID 123456789012345678901234 not found',
    })
  })
})
