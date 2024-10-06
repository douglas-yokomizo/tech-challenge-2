import { z } from 'zod'

// Define a schema for validating environment variables
const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'), // Environment should be either 'development', 'production', or 'test', default is 'development'
  PORT: z.coerce.number().default(8000), // Port should be a number, default is 8000
  MONGO_URI: z
    .string()
    .url()
    .default('mongodb://localhost:27017/tech-challenge-2'), // MongoDB URI should be a string and a valid URL
})

// Validate the environment variables against the schema
const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error(_env.error.format()) // Log the validation errors for debugging
  throw new Error('Invalid environment variables')
}

// Export the validated environment variables
export const env = _env.data
