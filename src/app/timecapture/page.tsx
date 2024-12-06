"use client";
import { UserIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'
import React, { useState, useEffect, useRef } from 'react';
import { LineBalancingAPI } from "@/services/apis/line_balancing";
import NavBar from '@/components/layouts/NavBar';
import { AppController } from '@/services/controllers/app_controller';
import { AppConfig } from '@/services/configs/config';
import { AppSession } from '@/services/configs/appSession';


const TimeCapture = () => {

    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [description, setDescription] = useState<string>('');
    const [station, setStation] = useState<string>('');
    const [employee, setEmployee] = useState<string>('');
    const [stepCode, setStepCode] = useState<string>('');
    const [cycleTime, setCycleTime] = useState<string>('00:000');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorString, setErrorString] = useState<string>('');

    const intervalIdRef: any = useRef(null);
    const startTimeRef = useRef(0);
    const [isStarted, setIsStarted] = useState(false);
    const [user, setUser] = useState<any>();
    const [workspaces, setWorkspaces] = useState<any[]>([]);
    const [appController, setAppController] = useState<AppController>(new AppController());

    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        }
        return () => {
            clearInterval(intervalIdRef.current);
        }
    }, [isRunning]);

    
    useEffect(() => {
        AppConfig.forceInspectLogin();
        if (!user) {
            setUser(AppSession.getUser());
            setWorkspaces(AppSession.getWorkspaces());
        }
        appController.user = user;
        appController.workspaces = workspaces;

    }, [user, appController, workspaces]);

    function start() {
        setIsRunning(true);
        setIsStarted(true);
        startTimeRef.current = Date.now() - elapsedTime;
        setErrorString('');

    }

    function stop() {
        setIsRunning(false);
        setIsStarted(false);
        setCycleTime(formatTime());

    }

    function reset() {
        setElapsedTime(0);
        setCycleTime('00:000');
        setIsRunning(false);
        setIsStarted(false);
        setErrorString('');

    }


    const handleCreateDetail = (event: React.FormEvent) => {
        event.preventDefault();
        setErrorString('');
        //window.location.assign('/dashboard');

        setIsLoading(true);
        LineBalancingAPI.createDetail('6751ec7b146a85b8302601f9', '6751ec7b146a85b8302601fb', '67520461708a1747cd5e8695', elapsedTime, employee, description, station, stepCode).then((response) => {
            setIsLoading(false);
            setErrorString(response.message);

            // AppSession.storeUser(res.user);
            // AppSession.storeWorkspaces(res.workspaces);
            // window.location.assign('/dashboard');
        }).catch(error => {
            console.log('ERR: ' + error);
            setErrorString('ERR: ' + error);

            setIsLoading(false);
            // setError('Username หรือ Password ไม่ถูกต้อง');
        });
    }



    function formatTime() {
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);
        let milliseconds = Math.floor((elapsedTime % 1000));

        const minutes_str = String(minutes).padStart(2, "0");
        const seconds_str = String(seconds).padStart(2, "0");
        const milliseconds_str = String(milliseconds).padStart(3, "0");

        return `${seconds_str}:${milliseconds_str}`;
    }

    
    function bacgPage() {

        window.location.assign('/linebalancing');

    }


    return (
        <>
            <NavBar user={user} path="/linebalancing" />

            <div className="p-8">
                <div className="grid grid-cols-6 gap-32 mb-8">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Step Code</label>
                        <input
                            type="text"
                            onChange={(e) => setStepCode(e.target.value)}

                            className="w-60 px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <input
                            type="text"
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-96 px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
                <div className='grid grid-cols-6 mb-8 gap-52'>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Station</label>
                        <input
                            type="text"
                            onChange={(e) => setStation(e.target.value)}
                            className="w-60 px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Employee</label>
                        <input
                            type="text"
                            onChange={(e) => setEmployee(e.target.value)}
                            className="w-60 px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Cycle Time</label>
                        <input
                        readOnly={true}

                            type="text"
                            value={cycleTime}
                            onChange={(e) => setCycleTime(e.target.value)}
                            className="w-60 px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="flex gap-4 col-span-3 space-x-4 mt-5 justify-end">
                        {isLoading ? <button
                            className="px-6 py-2 bg-gray-50 text-gray-600 rounded-md shadow-md "
                            disabled={true}>
                            Saveing...
                        </button>
                            : <button
                                className="px-6 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition"
                                onClick={handleCreateDetail}>
                                Save
                            </button>}
                        <button className="px-6 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition"
                        
                        onClick={bacgPage}>
                            Cancel
                        </button>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <label className="block text-sm font-medium text-gray-700">{errorString}</label>

                </div>

                <div className="flex flex-col items-center">
                    <div className="font-bold text-black"><span className='text-[200px]'>{formatTime()}</span></div>
                    <div className="flex space-x-4 mt-4">
                        <button onClick={isStarted ? stop : start}
                            className="px-6 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition"
                        >
                            Start/Stop
                        </button>
                        <button onClick={reset}
                            className="px-6 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition"
                        >
                            Reset
                        </button>
                    </div>
                </div>

            </div>
        </>
    );
};

export default TimeCapture;
