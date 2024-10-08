/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import express, { Request, Response, NextFunction } from 'express'
import request from 'supertest'
import { validateObjectId } from '../../middleware/validateObjectId'
import { z } from 'zod'

describe('validateObjectId Middleware', () => {
  let app: express.Application

  beforeAll(() => {
    app = express()

    // Route using the validateObjectId middleware
    app.get('/test/:id', validateObjectId, (req: Request, res: Response) => {
      res.status(200).send('Success')
    })

    // Error handling middleware
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      res.status(500).json({ message: err.message })
    })
  })

  it('should pass any other errors to the next error handler', async () => {
    // Mock the schema.parse method to throw a generic error
    const mockError = new Error('Test Error')
    jest.spyOn(z.ZodObject.prototype, 'parse').mockImplementation(() => {
      throw mockError
    })

    const response = await request(app).get('/test/invalidObjectId')

    expect(response.status).toBe(500)
    expect(response.body.message).toBe('Test Error')
  })
})
