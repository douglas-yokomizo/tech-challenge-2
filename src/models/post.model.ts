import { Schema, model, Document, ObjectId } from 'mongoose' // Importing Schema, model, and Document from mongoose

// Define the PostType interface that extends Document from mongoose
export interface PostType extends Document {
  _id: ObjectId
  title: string // Title of the post
  content: string // Content of the post
  createdAt: Date // Creation date of the post
  updatedAt: Date // Last update date of the post
}

// Defining the schema for the Post model
const postSchema = new Schema<PostType>(
  {
    title: { type: String, required: true }, // Title field is a required string
    content: { type: String, required: true }, // Content field is a required string
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
)

// Creating the Post model based on the schema
const Post = model<PostType>('Post', postSchema) // Defining the model with the name 'Post' and the schema

export default Post // Exporting the Post model for use in other modules
