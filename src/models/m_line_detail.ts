import { Document } from 'mongoose';
// Define an interface for the LineDetail document that extends mongoose's Document
export interface ILineDetail extends Document {
    user_id: string;
    workspace_id: string;
    line_header_id: string;
    cycle_time: number;
    description?: string;
    employee?: string;
    station: string;
    step_code: string;
}