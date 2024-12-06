import { Document } from 'mongoose';
// Define an interface for the LineHeader document that extends mongoose's Document
export interface ILineHeader extends Document {
    user_id: string;
    workspace_id: string;
    line_code: string;
    model_code: string;
    takt_time?: number;
    unit_per_hour?: number;
    total_cycle_time?: number;
}