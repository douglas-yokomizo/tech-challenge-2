import mongoose from 'mongoose'
import app from '../../app'
import { setupSwagger } from '../../middleware/swagger'

jest.mock('../../middleware/swagger') // Mocka o módulo

beforeAll(async () => {
  // Definindo variáveis de ambiente para testes
  process.env.MONGO_URI = 'mongodb://localhost:27017/tech-challenge' // URL do banco de dados de teste
  process.env.PORT = '3001'
})

// Mocka o console.error
const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

afterAll(async () => {
  await mongoose.connection.close() // Fecha a conexão após os testes
  consoleErrorSpy.mockRestore() // Restaura o console.error original
})

describe('Server Setup', () => {
  it('should set up Swagger', () => {
    require('../../server') // Inicializa o servidor

    expect(setupSwagger).toHaveBeenCalledWith(app) // Verifica se o setupSwagger foi chamado corretamente
  })
})
