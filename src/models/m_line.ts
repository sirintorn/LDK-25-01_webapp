import { Document } from 'mongoose';
// Define an interface for the Line document that extends mongoose's Document
export interface ILine extends Document {
    user_id: string;
    workspace_id: string;
    name: string;
    code: string;
}
