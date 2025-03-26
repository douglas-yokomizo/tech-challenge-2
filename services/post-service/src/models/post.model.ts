import { Schema, model, Document, ObjectId } from 'mongoose'

export interface PostType extends Document {
  _id: ObjectId
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

const postSchema = new Schema<PostType>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)

const Post = model<PostType>('Post', postSchema)

export default Post 
