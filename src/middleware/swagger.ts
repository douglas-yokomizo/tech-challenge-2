import swaggerUi from 'swagger-ui-express'
import fs from 'fs'
import path from 'path'
import { Express } from 'express'

/// Function to setup Swagger
export const setupSwagger = (app: Express) => {
  const CSS_URL =
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css'

  // Path to the swagger.json file
  const swaggerFilePath = path.resolve(__dirname, '../swagger/swagger.json')
  console.log(`Swagger file path: ${swaggerFilePath}`) // Log the file path

  const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, 'utf8'))

  // Use the swaggerDocument for Swagger setup
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      customCss:
        '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
      customCssUrl: CSS_URL,
    }),
  )
}
