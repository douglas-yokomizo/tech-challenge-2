import { Schema, model, Document } from 'mongoose'

export interface UserType extends Document {
  name: string
  admin: boolean
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<UserType>(
  {
    name: { type: String, required: true },
    admin: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  },
)

const User = model<UserType>('User', userSchema)

export default User 
