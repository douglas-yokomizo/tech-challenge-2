/* eslint-disable no-undef */

import express from 'express' // Import the express framework
import request from 'supertest' // Import supertest for HTTP assertions
import { setupSwagger } from '../../middleware/swagger' // Import the Swagger setup middleware

describe('Swagger Middleware', () => {
  let app: express.Express // Declare a variable for the Express app

  beforeEach(() => {
    app = express() // Initialize a new Express app before each test
    setupSwagger(app) // Set up the Swagger middleware with the app
  })

  it('should serve Swagger UI at /api-docs', async () => {
    const response = await request(app).get('/api-docs').redirects(1) // Make a GET request to /api-docs and follow redirects
    expect(response.status).toBe(200) // Expect a 200 OK response
    expect(response.text).toContain('Swagger UI') // Check that the response contains 'Swagger UI'
  })

  it('should serve Swagger JSON at /api-docs/swagger.json', async () => {
    const response = await request(app).get('/api-docs/swagger.json') // Make a GET request to /api-docs/swagger.json
    console.log(response.body) // Log the response body for debugging
    expect(response.status).toBe(200) // Expect a 200 OK response
  })
})
