import axios from "axios";
import { AppConfig } from "../configs/config";

/* eslint-disable @typescript-eslint/no-explicit-any */
export class UserAPI{
    static path: string = '/user';

    static login(email: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const data = JSON.stringify({
                "email": email,
                "password": password
            });

            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${AppConfig.getAPIPath()}${this.path}/login`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };


            axios.request(config)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });

        });
    }
}