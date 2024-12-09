/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { AppConfig } from "../configs/config";

export class LineBalancingAPI {
    static path: string = '/new-line';

    static getHeader(line_header_id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${AppConfig.getAPIPath()}${this.path}/header/${line_header_id}`,
                headers: {
                    'Content-Type': 'application/json'
                },
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

    static getDetailsByHeader(line_header_id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${AppConfig.getAPIPath()}${this.path}/detail/by-header/${line_header_id}`,
                headers: {}
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

    static getDetail(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${AppConfig.getAPIPath()}${this.path}/detail/${id}`,
                headers: {}
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

    static createDetail(user_id: string, workspace_id: string, line_header_id: string, cycle_time: number, description: string, employee: string, station: string, step_code: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const data = JSON.stringify({
                "user_id": user_id,
                "workspace_id": workspace_id,
                "line_header_id": line_header_id,
                "cycle_time": cycle_time,
                "description": description,
                "employee": employee,
                "station": station,
                "step_code": step_code
            });

            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${AppConfig.getAPIPath()}${this.path}/detail`,
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

    static editDetail(line_detail_id: string, obj: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const data = JSON.stringify(obj);

            const config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: `${AppConfig.getAPIPath()}${this.path}/detail/edit/${line_detail_id}`,
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

    static deleteDetails(ids: string[]): Promise<any> {
        return new Promise((resolve, reject) => {
            const data = JSON.stringify({
                "ids": ids
            });

            const config = {
                method: 'delete',
                maxBodyLength: Infinity,
                url: `${AppConfig.getAPIPath()}${this.path}/detail/delete`,
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