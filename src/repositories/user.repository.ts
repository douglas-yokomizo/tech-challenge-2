import User from '../models/user.model' // Importing the User model for database operations
import { Document } from 'mongoose' // Importing Document type from mongoose for type definition

// Define the UserType interface that extends Document from mongoose
export interface UserType extends Document {
  name: string // Name user
  admin: boolean // User level
  createdAt: Date // Creation date of the user
  updatedAt: Date // Last update date of the user
}

// Class representing the User repository
export class UserRepository {
  // Asynchronous method to create a new User
  async createUser(user: {
    name: string // Name of the User to be created
    admin: boolean // Content of the User to be created
  }): Promise<UserType> {
    // Create a new instance of the User model with the provided data
    const newUser = new User(user)

    // Save the new User to the database
    await newUser.save()

    // Return the new User as UserType
    return newUser as UserType
  }

  public async getUserById(id: string): Promise<UserType | null> {
    // Find a user by its ID
    const userById = await User.findById(id)

    // Return the found user or null if not found
    return userById as UserType | null
  }

  async findById(id: string): Promise<UserType | null> {
    // Finding a user by its ID with execution
    return User.findById(id).exec() // Executing the query to find the user
  }

  public async getAllUsers(): Promise<UserType[]> {
    // Find all users
    const users = await User.find()

    // Return the found users
    return users as UserType[]
  }

  // Asynchronous method to delete a User by ID
  public async deleteUserById(id: string): Promise<UserType | null> {
    // Finding and deleting a user by its ID
    const deletedUser = await User.findByIdAndDelete(id)
    return deletedUser as UserType | null // Returning the deleted user or null
  }

  // Asynchronous method to update a user by ID
  public async updateUserById(
    id: string,
    updateData: Partial<UserType>,
  ): Promise<UserType | null> {
    // Finding and updating a user by its ID with new data
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true, // Returning the updated user
    })
    return updatedUser as UserType | null // Returning the updated user or null
  }
}
