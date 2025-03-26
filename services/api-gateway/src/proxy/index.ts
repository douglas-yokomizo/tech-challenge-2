import { createProxyMiddleware } from 'http-proxy-middleware'
import { Express } from 'express'
import { env } from '../env'

export const setupProxies = (app: Express) => {
  // Proxy for User service
  app.use(
    '/api/users',
    createProxyMiddleware({
      target: env.USER_SERVICE_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/api/users': '/api/users',
      },
      logLevel: 'debug',
    })
  )

  // Proxy for Post service
  app.use(
    '/api/posts',
    createProxyMiddleware({
      target: env.POST_SERVICE_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/api/posts': '/api/posts',
      },
      logLevel: 'debug',
    })
  )

  // Health check for all services
  app.use(
    '/health/users',
    createProxyMiddleware({
      target: env.USER_SERVICE_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/health/users': '/health',
      },
    })
  )

  app.use(
    '/health/posts',
    createProxyMiddleware({
      target: env.POST_SERVICE_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/health/posts': '/health',
      },
    })
  )
} 
