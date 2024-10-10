import { z } from 'zod'
import dotenv from 'dotenv'

// Carregar variáveis de ambiente do arquivo .env
dotenv.config()

// Definir um esquema para validar variáveis de ambiente
export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'), // O ambiente deve ser 'development', 'production' ou 'test', o padrão é 'development'
  PORT: z.coerce.number().default(8000), // A porta deve ser um número, o padrão é 8000
  MONGO_URI: z
    .string()
    .url()
    .default('mongodb://localhost:27017/tech-challenge'), // A URI do MongoDB deve ser uma string e uma URL válida
})

// Validar as variáveis de ambiente contra o esquema
const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('Invalid environment variables:', _env.error.format())
  throw new Error('Invalid environment variables')
}

// Exportar as variáveis de ambiente validadas
export const env = _env.data
