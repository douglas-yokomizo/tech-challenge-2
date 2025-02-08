import { Schema, model, Document } from 'mongoose' // Importing Schema, model, and Document from mongoose

// Define the UserType interface that extends Document from mongoose
export interface UserType extends Document {
  name: string // Name user
  admin: boolean // User level
  createdAt: Date // Creation date of the user
  updatedAt: Date // Last update date of the user
}

// Defining the schema for the User model
const userSchema = new Schema<UserType>(
  {
    name: { type: String, required: true }, // Name field is a required string
    admin: { type: Boolean, required: true }, // Admin field is a required boolean
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
)

// Creating the User model based on the schema
const User = model<UserType>('User', userSchema) // Defining the model with the name 'User' and the schema

export default User // Exporting the User model for use in other modules
