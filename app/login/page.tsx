/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { AppSession } from "@/services/configs/appSession";
import { AppConfig } from "@/services/configs/config";
import { UserAPI } from "@/services/apis/user";
import Image from "next/image";
import { Suspense, useState } from "react";


const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        //window.location.assign('/dashboard');

        setIsLoading(true);
        UserAPI.login(email, password).then((response) => {
            setIsLoading(false);
            const res = response.data;
            AppSession.storeUser(res.user);
            AppSession.storeWorkspaces(res.workspaces);
            window.location.assign('/dashboard');
        }).catch(error => {
            console.log('ERR: ' + error);
            setIsLoading(false);
            setError('Username หรือ Password ไม่ถูกต้อง');
        });
    }

    return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                    <div className='flex justify-center items-center'>
                        <img
                            alt="Your Company"
                            src={"/assets/logos/wireframe.png"}
                            width={72}
                            height={72}
                            className="h-32 w-auto justify-center"
                        />
                    </div>
                    <div className="text-center">
                        <h1 className="font-bold text-black text-2xl">{AppConfig.APP_NAME}</h1>
                        <p className="mt-2 text-gray-600">Please login.</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-black">
                                E-mail
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none text-black"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-black">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none text-black"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>


                        {error && <p className="text-sm text-red-500">{error}</p>}

                        {!isLoading && <button type="submit"
                            className="w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2">Login</button>}
                        {isLoading && <button disabled={true}
                            className="w-full px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            Authenticating...
                        </button>}
                    </form>
                    <div className='text-center'>
                        <span className="text-gray-500 text-sm">{AppConfig.APP_VERSION}</span>
                    </div>
                </div>
            </div>
    );
};

export default LoginPage;

/*
email: developer@theintegrator.co.th
pass: devIntegrator2024!
*/
