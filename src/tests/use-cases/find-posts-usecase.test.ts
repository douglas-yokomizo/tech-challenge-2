import { FindPostsCase } from '../../use-cases/find-posts-usecase'
import { PostRepository } from '../../repositories/post.repository'

// Mocking the PostRepository
const mockPostRepository = {
  findById: jest.fn(),
}

describe('FindPostsCase', () => {
  let findPostsCase: FindPostsCase

  beforeEach(() => {
    findPostsCase = new FindPostsCase(
      mockPostRepository as unknown as PostRepository,
    )
  })

  it('should find a post by ID', async () => {
    const postId = '12345'
    const mockPost = {
      _id: postId,
      title: 'Test Post',
      content: 'This is a test post',
    }

    // Mocking the findById method to return the mockPost
    mockPostRepository.findById.mockResolvedValue(mockPost)

    const result = await findPostsCase.handler(postId)

    expect(mockPostRepository.findById).toHaveBeenCalledWith(postId)
    expect(result).toEqual(mockPost)
  })

  it('should return null if post is not found', async () => {
    const postId = '12345'

    // Mocking the findById method to return null
    mockPostRepository.findById.mockResolvedValue(null)

    const result = await findPostsCase.handler(postId)

    expect(mockPostRepository.findById).toHaveBeenCalledWith(postId)
    expect(result).toBeNull()
  })
})
