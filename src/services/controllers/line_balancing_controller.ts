import { LineAPI } from "../apis/line";
import { LineBalancingAPI } from "../apis/line_balancing";
import { ModelAPI } from "../apis/model";

/* eslint-disable @typescript-eslint/no-explicit-any */
export class LineBalancingController{
    isLoading: boolean = false;

    lines?: any[];
    models?: any[];

    user_id?: string;
    workspace_id?: string;

    target_line?: number;
    target_model?: number;

    line_header?: any;
    line_details?: any[];

    constructor(){
    }

    async init(user_id: string, workspace_id: string){
        try {
            this.user_id = user_id;
            this.workspace_id = workspace_id;

            const res_lines = await LineAPI.getByWorkspace(this.workspace_id);
            this.lines = res_lines.lines;

            const res_models = await ModelAPI.getByWorkspace(this.workspace_id);
            this.models = res_models.models;
        } catch (error) {
            console.log(`ERR: ${error}`);
        }
    }

    async syncHeader(){
        this.isLoading = true;
        this.isLoading = false;
        console.log(`line: ${this.target_line} | model: ${this.target_model}`);
        if(this.validateReady()){
            console.log('ready');
            try {
                const res = await LineBalancingAPI.syncHeader(
                    this.user_id!,
                    this.workspace_id!,
                    this.lines![this.target_line!].code,
                    this.models![this.target_model!].code
                );   
                this.line_header = res.line_header;

                const res2 = await LineBalancingAPI.getDetailsByHeader(this.line_header._id);
                this.line_details = res2.line_details;

                console.log(this.lines![this.target_line!].code, this.models![this.target_model!].code);
            } catch (error) {
                console.log(error);
            }
        }

        this.isLoading = false;
    }

    async editHeader(){
        try {
            await LineBalancingAPI.editHeader(this.line_header._id, {
                "takt_time": this.line_header.takt_time,
                "unit_per_hour": this.line_header.unit_per_hour,
                "total_cycle_time": this.line_header.total_cycle_time
            });
        } catch (error) {
            console.log(`ERR: ${error}`);
        }
    }

    validateReady(){
        return (!isNaN(this.target_line ?? -1) && !isNaN(this.target_model ?? -1)) && (((this.target_line ?? -1) > -1) && ((this.target_model ?? -1) > -1));
    }

    async deleteDetails(ids: any[]){
        try {
            if(ids && ids.length > 0) await LineBalancingAPI.deleteDetails(ids);
        } catch (error) {
            console.log(error);
        }
    }
}