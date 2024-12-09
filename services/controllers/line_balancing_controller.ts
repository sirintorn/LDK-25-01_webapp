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

    target_line?: string;
    target_model?: string;

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
                    this.target_line ?? 'unknown',
                    this.target_model ?? 'unknown'
                );   
                this.line_header = res.line_header;

                const res2 = await LineBalancingAPI.getDetailsByHeader(this.line_header._id);
                this.line_details = res2.line_details;
            } catch (error) {
                console.log(error);
            }
        }

        this.isLoading = false;
    }

    async loadHeader(hid: string){
        this.isLoading = true;
        this.isLoading = false;
        if(hid){
            console.log('ready');
            try {
                const res = await LineBalancingAPI.getHeader(
                    hid
                );   
                this.line_header = res.line_header;

                const res2 = await LineBalancingAPI.getDetailsByHeader(this.line_header._id);
                this.line_details = res2.line_details;

                this.target_line = this.line_header.line_code;
                this.target_model = this.line_header.model_code;
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
            });
        } catch (error) {
            console.log(`ERR: ${error}`);
        }
    }

    validateReady(){
        return (this.target_line  && this.target_model);
    }

    async deleteDetails(ids: any[]){
        try {
            if(ids && ids.length > 0) await LineBalancingAPI.deleteDetails(ids);
        } catch (error) {
            console.log(error);
        }
    }
}