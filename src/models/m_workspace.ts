import { Document } from 'mongoose';

// Define an interface for the Workspace document that extends mongoose's Document
export interface IWorkspace extends Document {
    user_id: string;
    name: string;
}