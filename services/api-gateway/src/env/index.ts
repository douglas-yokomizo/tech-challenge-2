import { z } from 'zod'
import dotenv from 'dotenv'

dotenv.config()

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  PORT: z.coerce.number().default(8000),
  
  USER_SERVICE_URL: z
    .string()
    .url()
    .default('http://user-service:3001'),
  
  POST_SERVICE_URL: z
    .string()
    .url()
    .default('http://post-service:3002'),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('Invalid environment variables:', _env.error.format())
  throw new Error('Invalid environment variables')
}

export const env = _env.data 
