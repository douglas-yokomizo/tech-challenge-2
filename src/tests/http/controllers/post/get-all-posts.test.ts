import request from 'supertest'
import mongoose from 'mongoose'
import app from '../../../../app'
import Post from '../../../../models/post.model'
import { env } from '../../../../env'

const mongoUri =
  env.MONGO_URI || 'mongodb://localhost:27017/tech-challenge-2-test'

beforeAll(async () => {
  console.log('Connecting to MongoDB...')
  await mongoose.connect(mongoUri)
  console.log('Connected to MongoDB')
}, 30000) // Aumenta o tempo limite para 30 segundos

afterAll(async () => {
  if (mongoose.connection.db) {
    console.log('Dropping database...')
    await mongoose.connection.db.dropDatabase()
  }
  console.log('Closing MongoDB connection...')
  await mongoose.connection.close()
  console.log('MongoDB connection closed')
}, 30000) // Aumenta o tempo limite para 30 segundos

describe('Get All Posts', () => {
  beforeEach(async () => {
    await Post.deleteMany({})
  })

  it('should get all posts', async () => {
    const post1 = new Post({
      title: 'Test Post 1',
      content: 'This is test post 1',
    })
    const post2 = new Post({
      title: 'Test Post 2',
      content: 'This is test post 2',
    })
    await post1.save()
    await post2.save()

    const res = await request(app).get('/posts')

    expect(res.statusCode).toEqual(200)
    expect(res.body).toBeInstanceOf(Array)
    expect(res.body.length).toBe(2)
    expect(res.body[0]).toHaveProperty('title', 'Test Post 1')
    expect(res.body[1]).toHaveProperty('title', 'Test Post 2')
  })

  it('should return an empty array if no posts are found', async () => {
    const res = await request(app).get('/posts')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toBeInstanceOf(Array)
    expect(res.body.length).toBe(0)
  })

  it('should handle error when getting all posts', async () => {
    jest.spyOn(Post, 'find').mockImplementationOnce(() => {
      throw new Error('Database error')
    })
    const res = await request(app).get('/posts')
    expect(res.statusCode).toEqual(500)
    expect(res.body).toHaveProperty('message', 'Internal Server Error')
  }, 10000) // Aumenta o tempo limite para 10 segundos
})
