import 'dotenv/config' // Load environment variables from a .env file

import { z } from 'zod' // Importing zod for schema validation

// Define a schema for validating environment variables
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'), // Environment should be either 'development' or 'production', default is 'development'
  PORT: z.coerce.number().default(3000), // Port should be a number, default is 3000
  MONGO_URI: z.string().default('mongodb://localhost:27017/test'), // MongoDB URI should be a string, default is set for local development
})

// Validate the environment variables against the schema
const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  throw new Error('Invalid environment variables') // Throw an error if the validation fails
}

// Export the validated environment variables
export const env = _env.data