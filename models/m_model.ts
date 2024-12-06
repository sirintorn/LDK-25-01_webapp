import { Document } from 'mongoose';
// Define an interface for the Model document that extends mongoose's Document
export interface IModel extends Document {
    user_id: string;
    workspace_id: string;
    name: string;
    code: string;
}