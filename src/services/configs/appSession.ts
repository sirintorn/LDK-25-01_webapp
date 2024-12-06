/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

export class AppSession {
    sessionName: string = 'ldk';

    static sessions = {
        user: 'user',
        workspaces: 'workspaces',
        last_config: 'last_config'
    };

    constructor() {
    }

    static getUser() {
        try {
            const data = sessionStorage.getItem(this.sessions.user);
            if(data){
                const snapshot = JSON.parse(data);
                return snapshot;
            }else{
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    static storeUser(user: any) {
        try {
            const data = JSON.stringify(user);
            sessionStorage.setItem(this.sessions.user, data);
            return;
        } catch (error) {
            throw error;
        }
    }

    static deleteUser() {
        try {
            sessionStorage.removeItem(this.sessions.user);
            return;
        } catch (error) {
            throw error;
        }
    }

    static isLoggedIn() {
        try {
            const snapshot = this.getUser();
            return snapshot ? true : false;
        } catch (error) {
            throw error;
        }
    }

    static getWorkspaces() {
        try {
            const data = sessionStorage.getItem(this.sessions.workspaces);
            if(data){
                const snapshot = JSON.parse(data);
                return snapshot;
            }else{
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    static storeWorkspaces(workspaces: any) {
        try {
            const data = JSON.stringify(workspaces);
            sessionStorage.setItem(this.sessions.workspaces, data);
            return;
        } catch (error) {
            throw error;
        }
    }

    static deleteWorkspaces() {
        try {
            sessionStorage.removeItem(this.sessions.workspaces);
            return;
        } catch (error) {
            throw error;
        }
    }

    static getLastConfig() {
        try {
            const data = sessionStorage.getItem(this.sessions.last_config);
            if(data){
                const snapshot = JSON.parse(data);
                return snapshot;
            }else{
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    static storeLastConfig(config: any) {
        try {
            const data = JSON.stringify(config);
            sessionStorage.setItem(this.sessions.last_config, data);
            return;
        } catch (error) {
            throw error;
        }
    }

    static deleteLastConfig() {
        try {
            sessionStorage.removeItem(this.sessions.last_config);
            return;
        } catch (error) {
            throw error;
        }
    }
}