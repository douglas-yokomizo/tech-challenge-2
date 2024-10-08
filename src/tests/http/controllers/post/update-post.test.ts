/* eslint-disable no-undef */

import 'dotenv/config' // Carrega as variáveis de ambiente do arquivo .env.test
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

afterAll(async () => {
  if (mongoose.connection.db) {
    console.log('Dropping database...')
    await mongoose.connection.db.dropDatabase()
  }
  console.log('Closing MongoDB connection...')
  await mongoose.connection.close()
  console.log('MongoDB connection closed')
}, 30000)

describe('Update Post by ID', () => {
  let postId: string

  beforeEach(async () => {
    const post = new Post({
      title: 'Test Post',
      content: 'This is a test post',
    })
    const savedPost: PostType = await post.save() // Adicione a tipagem explícita
    postId = savedPost._id.toString()
  })

  afterEach(async () => {
    await Post.deleteMany({})
  })

  it('should return 404 if post ID is not found', async () => {
    jest.setTimeout(10000) // Define o tempo limite para 10 segundos
    const nonExistentId = new mongoose.Types.ObjectId().toString()
    const res = await request(app).patch(`/posts/${nonExistentId}`).send({
      title: 'Updated Test Post',
      content: 'This is an updated test post',
    })
    expect(res.statusCode).toEqual(404)
    expect(res.body).toHaveProperty('message', `ID ${nonExistentId} not found`)
  })

  it('should return 400 for invalid post ID', async () => {
    jest.setTimeout(10000) // Define o tempo limite para 10 segundos
    const invalidId = '12345'
    const res = await request(app).patch(`/posts/${invalidId}`).send({
      title: 'Updated Test Post',
      content: 'This is an updated test post',
    })
    expect(res.statusCode).toEqual(400)
  })

  it('should handle error when updating a post by ID', async () => {
    jest.setTimeout(10000) // Define o tempo limite para 10 segundos
    jest.spyOn(Post, 'findByIdAndUpdate').mockImplementationOnce(() => {
      throw new Error('Database error')
    })
    const res = await request(app).patch(`/posts/${postId}`).send({
      title: 'Updated Test Post',
      content: 'This is an updated test post',
    })
    expect(res.statusCode).toEqual(500)
  })
})
