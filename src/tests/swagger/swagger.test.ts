/* eslint-disable no-undef */

import express from 'express'
import request from 'supertest'
import { setupSwagger } from '../../middleware/swagger'

describe('Swagger Middleware', () => {
  let app: express.Express

  beforeEach(() => {
    app = express()
    setupSwagger(app)
  })

  it('should serve Swagger UI at /api-docs', async () => {
    const response = await request(app).get('/api-docs').redirects(1)
    expect(response.status).toBe(200)
    expect(response.text).toContain('Swagger UI')
  })

  it('should serve Swagger JSON at /api-docs/swagger.json', async () => {
    const response = await request(app).get('/api-docs/swagger.json')
    console.log(response.body) // Log the response body for debugging
    expect(response.status).toBe(200)
  })
})
