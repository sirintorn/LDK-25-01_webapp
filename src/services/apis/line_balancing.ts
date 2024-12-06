/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { AppConfig } from "../configs/config";

export class LineBalancingAPI {
    static path: string = '/new-line';

    static syncHeader(user_id: string, workspace_id: string, line_code: string, model_code: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const data = JSON.stringify({
                "user_id": user_id,
                "workspace_id": workspace_id,
                "line_code": line_code,
                "model_code": model_code,
                "takt_time": 0,
                "unit_per_hour": 0,
                "total_cycle_time": 0
            });

            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${AppConfig.getAPIPath()}${this.path}/header/sync`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });

        });
    }

    static editHeader(line_header_id: string, obj: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const data = JSON.stringify(obj);

            const config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: `${AppConfig.getAPIPath()}${this.path}/header/edit/${line_header_id}`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });

        });
    }
}