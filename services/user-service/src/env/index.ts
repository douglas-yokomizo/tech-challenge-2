import { z } from 'zod'
import dotenv from 'dotenv'

dotenv.config()

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  PORT: z.coerce.number().default(3001),

  MONGO_URI: z
    .string()
    .url()
    .default('mongodb://localhost:27017/user-service'),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('Invalid environment variables:', _env.error.format())
  throw new Error('Invalid environment variables')
}

export const env = _env.data 
