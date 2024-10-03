/* eslint-disable no-undef */
import request from 'supertest'
import mongoose from 'mongoose'
import app from '../app'
import Post from '../models/post.model'

const mongoUri = 'mongodb://localhost:27017/tech-challenge-2-test'

beforeAll(async () => {
  await mongoose.connect(mongoUri)
})

afterAll(async () => {
  if (mongoose.connection.db) {
    await mongoose.connection.db.dropDatabase()
  }
  await mongoose.connection.close()
})

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

  it('should return 400 for invalid post creation', async () => {
    const res = await request(app).post('/posts').send({
      title: '', // Invalid title
      content: 'This is a test post',
    })
    expect(res.statusCode).toEqual(400)
  })

  it('should get all posts', async () => {
    const res = await request(app).get('/posts')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toBeInstanceOf(Array)
  })

  it('should handle error when getting all posts', async () => {
    jest.spyOn(Post, 'find').mockImplementationOnce(() => {
      throw new Error('Database error')
    })
    const res = await request(app).get('/posts')
    expect(res.statusCode).toEqual(500)
  })

  it('should get a post by ID', async () => {
    const post = new Post({
      title: 'Test Post',
      content: 'This is a test post',
    })
    await post.save()

    const res = await request(app).get(`/posts/${post._id}`)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('_id')
    expect(res.body.title).toBe('Test Post')
  })

  it('should return 500 for non-existing post by ID', async () => {
    const res = await request(app).get('/posts/invalidId')
    expect(res.statusCode).toEqual(500)
  })

  it('should handle error when getting a post by ID', async () => {
    jest.spyOn(Post, 'findById').mockImplementationOnce(() => {
      throw new Error('Database error')
    })
    const res = await request(app).get('/posts/invalidId')
    expect(res.statusCode).toEqual(500)
  })

  it('should update a post by ID', async () => {
    const post = new Post({
      title: 'Test Post',
      content: 'This is a test post',
    })
    await post.save()

    const res = await request(app)
      .patch(`/posts/${post._id}`)
      .send({ title: 'Updated Test Post' })
    expect(res.statusCode).toEqual(200)
    expect(res.body.title).toBe('Updated Test Post')
  })

  it('should return 400 for non-existing post update', async () => {
    const res = await request(app)
      .patch('/posts/invalidId')
      .send({ title: 'Updated Test Post' })
    expect(res.statusCode).toEqual(400)
  })

  it('should handle error when updating a post by ID', async () => {
    jest.spyOn(Post, 'findByIdAndUpdate').mockImplementationOnce(() => {
      throw new Error('Database error')
    })
    const res = await request(app)
      .patch('/posts/invalidId')
      .send({ title: 'Updated Test Post' })
    expect(res.statusCode).toEqual(400)
  })

  it('should delete a post by ID', async () => {
    const post = new Post({
      title: 'Test Post',
      content: 'This is a test post',
    })
    await post.save()

    const res = await request(app).delete(`/posts/${post._id}`)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('_id')
  })

  it('should return 500 for non-existing post deletion', async () => {
    const res = await request(app).delete('/posts/invalidId')
    expect(res.statusCode).toEqual(500)
  })

  it('should handle error when deleting a post by ID', async () => {
    jest.spyOn(Post, 'findByIdAndDelete').mockImplementationOnce(() => {
      throw new Error('Database error')
    })
    const res = await request(app).delete('/posts/invalidId')
    expect(res.statusCode).toEqual(500)
  })
})
