import { AppSession } from "../configs/appSession";

/* eslint-disable @typescript-eslint/no-explicit-any */
export class AppController {
    user?: any;
    workspaces?: any;
    targetWorkspace: number = 0;

    constructor() {
    }

    async init(user: any, workspaces: any[]) {
        this.user = user;
        this.workspaces = workspaces;
    }
}