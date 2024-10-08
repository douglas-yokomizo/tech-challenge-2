import swaggerUi from 'swagger-ui-express'
import fs from 'fs'
import path from 'path'
import { Express } from 'express'

/// Function to setup Swagger
export const setupSwagger = (app: Express) => {
  // Path to the swagger.json file
  const swaggerFilePath = path.resolve(__dirname, '../swagger/swagger.json')
  console.log(`Swagger file path: ${swaggerFilePath}`) // Log the file path

  const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, 'utf8'))

  // Use the swaggerDocument for Swagger setup
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
}
