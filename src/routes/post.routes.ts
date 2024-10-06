import { Router } from 'express' // Importing the Router from the Express framework
import { createPost } from '../http/controllers/post/create-post' // Importing the controller for creating a post
import { getPostById } from '../http/controllers/post/find-post' // Importing the controller for finding a post by ID
import { getAllPosts } from '../http/controllers/post/get-all-posts' // Importing the controller for getting all posts
import { deletePostById } from '../http/controllers/post/deletePostById' // Importing the controller for deleting a post by ID
import { updatePostById } from '../http/controllers/post/update-post' // Importing the controller for updating a post by ID

const router = Router() // Creating an instance of the Express Router

// Get all posts
router.get('/', getAllPosts) // Defining a route to get all posts

// Create a new post
router.post('/', createPost) // Defining a route to create a new post

// Get a single post by ID
router.get('/:id', getPostById) // Defining a route to get a post by its ID

// Update a post by ID
router.patch('/:id', updatePostById) // Defining a route to update a post by its ID

// Delete a post by ID
router.delete('/:id', deletePostById) // Defining a route to delete a post by its ID

export default router // Exporting the configured router for use in other modules
