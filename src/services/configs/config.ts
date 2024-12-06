/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppSession } from "./appSession";

export class AppConfig{
    
    static ENV: string = process.env.NODE_ENV || "development";
    //static ENV: string = "production";
    
    static APP_VERSION: string = 'v0.01.00 20241206';
    static APP_NAME: string = 'Lean Digital Tool Kits';

    static getAPIPath(): string{
        switch(this.ENV){
            case 'production':
                return 'http://54.87.206.172:4000/api';
            default:
                return 'http://localhost:4000/api';
        }
    }


    static forceInspectLogin(){
        let _user = null;

        if(AppSession.isLoggedIn()){
          //setUser(AppSession.getUser());
          _user = AppSession.getUser();
          //console.log('logged in by ' + _user.name);
        }else{
          window.location.assign('/');
        }
    }

    static forceInspectLogingrading(){
        let _user = null;

        if(AppSession.isLoggedIn()){
          //setUser(AppSession.getUser());
          _user = AppSession.getUser();
          //console.log('logged in by ' + _user.name);
        }else{
          window.location.assign('/login-grading');
        }
    }

}