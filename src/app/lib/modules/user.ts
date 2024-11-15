import mongoose, { Schema, Model } from 'mongoose';
import {IUser} from '@/app/types/TypeForUser'
// Define the interface for the User


// Define the schema for the User
const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true } // Adds createdAt and updatedAt automatically
);

// Check if the model already exists to avoid overwriting it
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
