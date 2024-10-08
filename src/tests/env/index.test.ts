/* eslint-disable no-undef */
describe('envSchema', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('should throw an error if environment variables are invalid', () => {
    // Mock console.error to suppress error output during test
    const consoleErrorMock = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    // Define variáveis de ambiente inválidas
    process.env.NODE_ENV = 'invalid_env'
    process.env.PORT = 'invalid_port'
    process.env.MONGO_URI = 'invalid_uri'

    // Import the module to trigger the validation
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-require-imports
      require('../../env')
    }).toThrow('Invalid environment variables')

    // Restore the original console.error
    consoleErrorMock.mockRestore()
  })
})
