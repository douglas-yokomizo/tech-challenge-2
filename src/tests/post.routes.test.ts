/* eslint-disable no-undef */

import 'dotenv/config' // Carrega as variáveis de ambiente do arquivo .env.test
import request from 'supertest'
import mongoose from 'mongoose'
import app from '../app'
import { env } from '../env'

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

describe('Post Routes', () => {
  it('should create a new post', async () => {
    const res = await request(app).post('/posts').send({
      title: 'Test Post',
      content: 'This is a test post',
    })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('_id')
    expect(res.body.title).toBe('Test Post')
  })

  // Outros testes...
})
