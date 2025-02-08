import { Router } from 'express' // Importing the Router from the Express framework
import { createUser } from '../http/controllers/user/create-user' // Importing the controller for creating a user
import { getAllUsers } from '../http/controllers/user/get-all-users' // Importing the controller for getting all users
import { deleteUserById } from '../http/controllers/user/deleteUserById' // Importing the controller for deleting a user by ID
import { updateUserById } from '../http/controllers/user/update-user' // Importing the controller for updating a user by ID

const router = Router() // Creating an instance of the Express Router

// Create a new user
router.post('/', createUser) // Defining a route to create a new user

// Get all users
router.get('/', getAllUsers) // Defining a route to get all users

// Update a user by ID
router.patch('/:id', updateUserById) // Defining a route to update a user by its ID

// Delete a user by ID
router.delete('/:id', deleteUserById) // Defining a route to delete a user by its ID

export default router // Exporting the configured router for use in other modules
