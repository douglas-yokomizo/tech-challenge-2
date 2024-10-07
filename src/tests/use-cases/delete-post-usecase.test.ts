import { DeletePostUseCase } from '../../use-cases/delete-post-usecase'
import { PostRepository } from '../../repositories/post.repository'

// Mocking the PostRepository
const mockPostRepository = {
  deletePostById: jest.fn(),
}

describe('DeletePostUseCase', () => {
  let deletePostUseCase: DeletePostUseCase

  beforeEach(() => {
    deletePostUseCase = new DeletePostUseCase(
      mockPostRepository as unknown as PostRepository,
    )
  })

  it('should delete a post by ID', async () => {
    const postId = '12345'
    mockPostRepository.deletePostById.mockResolvedValue(true)

    const result = await deletePostUseCase.execute(postId)

    expect(mockPostRepository.deletePostById).toHaveBeenCalledWith(postId)
    expect(result).toBe(true)
  })

  it('should return false if post is not found', async () => {
    const postId = '12345'
    mockPostRepository.deletePostById.mockResolvedValue(false)

    const result = await deletePostUseCase.execute(postId)

    expect(mockPostRepository.deletePostById).toHaveBeenCalledWith(postId)
    expect(result).toBe(false)
  })

  it('should handle errors', async () => {
    const postId = '12345'
    mockPostRepository.deletePostById.mockRejectedValue(
      new Error('Database error'),
    )

    await expect(deletePostUseCase.execute(postId)).rejects.toThrow(
      'Database error',
    )
  })
})
