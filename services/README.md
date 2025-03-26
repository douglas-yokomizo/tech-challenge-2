# Microservices Architecture

This project has been converted into a microservices architecture with the following components:

## Services

### API Gateway (Port 8000)
- Serves as the entry point for all client requests
- Routes requests to the appropriate microservices
- Handles cross-cutting concerns like authentication and logging
- Provides a unified API for clients

### User Service (Port 3001)
- Manages user data and operations
- Provides REST API for user CRUD operations
- Has its own MongoDB database

### Post Service (Port 3002)
- Manages post data and operations
- Provides REST API for post CRUD operations
- Has its own MongoDB database

## Architecture Benefits

1. **Scalability**: Each service can be scaled independently based on its specific load.
2. **Resilience**: Failure in one service doesn't bring down the entire system.
3. **Technology Flexibility**: Different services can use different technologies if needed.
4. **Development Independence**: Teams can work on different services simultaneously.
5. **Deployment Independence**: Services can be deployed independently.

## Running the Application

```bash
# Build and start all services
docker-compose up --build

# Access API Gateway
http://localhost:8000

# Health Checks
http://localhost:8000/health        # API Gateway health
http://localhost:8000/health/users  # User Service health
http://localhost:8000/health/posts  # Post Service health
```

## API Endpoints

### User Service
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get a specific user
- `POST /api/users` - Create a user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

### Post Service
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get a specific post
- `POST /api/posts` - Create a post
- `PUT /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post 
