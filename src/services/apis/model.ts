/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { AppConfig } from "../configs/config";

export class ModelAPI {
    static path: string = "/model";

    static getByWorkspace(workspace_id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${AppConfig.getAPIPath()}${this.path}/by-workspace/${workspace_id}`,
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
}