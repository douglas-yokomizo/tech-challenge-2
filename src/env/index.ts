import { z } from 'zod' // Import the Zod library for schema validation
import dotenv from 'dotenv' // Import dotenv to load environment variables from .env files

// Load environment variables from the .env file
dotenv.config()

// Define a schema to validate environment variables
export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'), // The environment must be 'development', 'production', or 'test'; defaults to 'development'

  PORT: z.coerce.number().default(8000), // The port must be a number; defaults to 8000

  MONGO_URI: z
    .string()
    .url()
    .default('mongodb://localhost:27017/tech-challenge'), // The MongoDB URI must be a string and a valid URL; defaults to a local MongoDB URI
})

// Validate the environment variables against the schema
const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('Invalid environment variables:', _env.error.format()) // Log any validation errors
  throw new Error('Invalid environment variables') // Throw an error if validation fails
}

// Export the validated environment variables
export const env = _env.data
