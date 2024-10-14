import { Request, Response, NextFunction } from 'express' // Import Request, Response, and NextFunction types from express
import { makeUpdatePostUseCase } from '../../../use-cases/factory/make-update-post-usecase' // Importing the factory function to create the use case for updating posts
import { asyncHandler } from '../../../middleware/asyncHandler' // Importing middleware for handling async operations
import { validateObjectId } from '../../../middleware/validateObjectId' // Importing middleware for validating ObjectId format
import { z } from 'zod' // Importing Zod for schema validation

// Definindo o esquema de validação Zod para os dados de atualização do post
const updatePostSchema = z.object({
  title: z.string().min(1, { message: 'Title cannot be empty' }),
  content: z.string().min(1, { message: 'Content cannot be empty' }),
})

// Middleware para validar os dados de atualização usando Zod
const validateUpdatePost = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = updatePostSchema.safeParse(req.body)
  if (!result.success) {
    return res.status(400).json({ message: result.error.errors })
  }
  next()
}

// Update a post by ID
export const updatePostById = [
  validateObjectId, // Aplicando o middleware de validação de ObjectId
  validateUpdatePost, // Aplicando o middleware de validação Zod
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params // Extraindo o ID dos parâmetros da requisição
    const updateData = req.body // Extraindo os dados de atualização do corpo da requisição
    const updatePostUseCase = makeUpdatePostUseCase() // Criando uma instância do caso de uso para atualizar um post
    const updatedPost = await updatePostUseCase.execute(id, updateData) // Executando a operação de atualização

    // Verifica se o post foi encontrado e atualizado
    if (!updatedPost) {
      return res.status(404).json({ message: `ID ${id} not found` }) // Responde com 404 se o post não for encontrado
    }

    return res.status(200).json(updatedPost) // Responde com 200 e o post atualizado
  }),
]
