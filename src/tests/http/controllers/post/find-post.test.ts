/* eslint-disable no-undef */

import 'dotenv/config'
import request from 'supertest'
import mongoose from 'mongoose'
import app from '../../../../app'
import Post, { PostType } from '../../../../models/post.model'
import { env } from '../../../../env'

const mongoUri =
  env.MONGO_URI || 'mongodb://localhost:27017/tech-challenge-2-test'

beforeAll(async () => {
  console.log('Connecting to MongoDB...')
  await mongoose.connect(mongoUri)
  console.log('Connected to MongoDB')
}, 30000)

describe('Find Post by ID', () => {
  let postId: string

  beforeEach(async () => {
    const post = new Post({
      title: 'Test Post',
      content: 'This is a test post',
    })
    const savedPost: PostType = await post.save()
    postId = savedPost._id.toString()
  })

  afterEach(async () => {
    await Post.deleteMany({})
  })

  it('should return 404 if post ID is not found', async () => {
    jest.setTimeout(10000) // Define o tempo limite para 10 segundos
    const nonExistentId = new mongoose.Types.ObjectId().toString()
    const res = await request(app).get(`/posts/${nonExistentId}`)
    expect(res.statusCode).toEqual(404)
    expect(res.body).toHaveProperty('message', `ID ${nonExistentId} not found`)
  })

  it('should return 400 for invalid post ID', async () => {
    jest.setTimeout(10000) // Define o tempo limite para 10 segundos
    const invalidId = '12345'
    const res = await request(app).get(`/posts/${invalidId}`)
    expect(res.statusCode).toEqual(400)
  })

  it('should handle error when finding a post by ID', async () => {
    jest.setTimeout(10000) // Define o tempo limite para 10 segundos
    jest.spyOn(Post, 'findById').mockImplementationOnce(() => {
      throw new Error('Database error')
    })
    const res = await request(app).get(`/posts/${postId}`)
    expect(res.statusCode).toEqual(500)
  })

  it('should return 200 and the post if the post ID is found', async () => {
    jest.setTimeout(30000) // Define o tempo limite para 30 segundos
    const res = await request(app).get(`/posts/${postId}`)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('title', 'Test Post')
    expect(res.body).toHaveProperty('content', 'This is a test post')
  })
})
