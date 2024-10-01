import express from 'express'
import routes from './routes/'

const app = express()

app.use(express.json()) // it parses incoming requests with JSON payloads without this middleware, req.body will be undefined
app.use('/', routes)

export default app
