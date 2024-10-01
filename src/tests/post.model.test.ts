/* eslint-disable no-undef */
import mongoose from 'mongoose'
import Post from '../models/post.model' // Adjust the path to your model

const mongoUri = 'mongodb://localhost:27017/tech-challenge-2-test'

// Connect to a test database before running the tests
beforeAll(async () => {
  await mongoose.connect(mongoUri)
})

// Clear the database after each test
afterEach(async () => {
  await Post.deleteMany({})
})

// Close the connection after all tests are done
afterAll(async () => {
  await mongoose.connection.close()
})

describe('Post Model', () => {
  it('should create a valid post', async () => {
    const post = new Post({
      title: 'Test Title',
      content: 'Test Content',
    })

    const savedPost = await post.save()

    expect(savedPost._id).toBeDefined()
    expect(savedPost.title).toBe('Test Title')
    expect(savedPost.content).toBe('Test Content')
    expect(savedPost.createdAt).toBeDefined()
    expect(savedPost.updatedAt).toBeDefined()
  })

  it('should not create a post without a title', async () => {
    const post = new Post({
      content: 'Test Content',
    })

    await expect(post.save()).rejects.toThrow()
  })

  it('should not create a post without content', async () => {
    const post = new Post({
      title: 'Test Title',
    })

    await expect(post.save()).rejects.toThrow()
  })

  it('should trim whitespace from title and content', async () => {
    const post = new Post({
      title: '   Test Title   ',
      content: '   Test Content   ',
    })

    const savedPost = await post.save()

    expect(savedPost.title).toBe('Test Title')
    expect(savedPost.content).toBe('Test Content')
  })

  it('should set createdAt and updatedAt correctly', async () => {
    const post = new Post({
      title: 'Test Title',
      content: 'Test Content',
    })

    const savedPost = await post.save()
    // InstanceOf is for ensuring expected objects have the right structure.
    expect(savedPost.createdAt).toBeInstanceOf(Date)
    expect(savedPost.updatedAt).toBeInstanceOf(Date)
    expect(savedPost.createdAt).toEqual(savedPost.updatedAt)
  })
})
