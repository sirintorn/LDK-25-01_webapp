import { Document } from 'mongoose';
// Define an interface for the User document that extends mongoose's Document
export interface IUser extends Document {
    email: string;
    password_hash: string;
    display_name: string;
}