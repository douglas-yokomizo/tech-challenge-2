/* eslint-disable no-undef */
import 'dotenv/config' // Carrega as variáveis de ambiente do arquivo .env.test
import request from 'supertest'
import mongoose from 'mongoose'
import app from '../../../../app'
import Post from '../../../../models/post.model'
import { env } from '../../../../env'

const mongoUri =
  env.MONGO_URI || 'mongodb://localhost:27017/tech-challenge-2-test'

beforeAll(async () => {
  try {
    console.log('Connecting to MongoDB...')
    await mongoose.connect(mongoUri)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}, 30000) // Aumenta o tempo limite para 30 segundos

afterAll(async () => {
  try {
    if (mongoose.connection.db) {
      console.log('Dropping database...')
      await mongoose.connection.db.dropDatabase()
    }
    console.log('Closing MongoDB connection...')
    await mongoose.connection.close()
    console.log('MongoDB connection closed')
  } catch (error) {
    console.error('Error closing MongoDB connection:', error)
  }
}, 30000) // Aumenta o tempo limite para 30 segundos

describe('Create Post', () => {
  it('should create a new post', async () => {
    const res = await request(app).post('/posts').send({
      title: 'Test Post',
      content: 'This is a test post',
    })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('_id')
    expect(res.body.title).toBe('Test Post')
  })

  it('should return 400 for invalid post creation', async () => {
    const res = await request(app).post('/posts').send({
      title: '', // Invalid title
      content: 'This is a test post',
    })
    expect(res.statusCode).toEqual(400)
  }, 30000) // Aumenta o tempo limite para 20 segundos

  it('should handle error when creating a post', async () => {
    jest.spyOn(console, 'error').mockImplementationOnce(() => {}) // Mock console.error to avoid logging errors during test
    jest.spyOn(mongoose.Model.prototype, 'save').mockImplementationOnce(() => {
      throw new Error('Database error')
    })
    const res = await request(app).post('/posts').send({
      title: 'Test Post',
      content: 'This is a test post',
    })
    expect(res.statusCode).toEqual(500)
  }, 20000) // Aumenta o tempo limite para 20 segundos
})
