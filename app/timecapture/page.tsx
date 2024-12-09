"use client";
import React, { useState, useEffect, useRef, Suspense } from 'react';
import { LineBalancingAPI } from "@/services/apis/line_balancing";
import NavBar from '@/components/layouts/NavBar';
import { AppController } from '@/services/controllers/app_controller';
import { AppConfig } from '@/services/configs/config';
import { AppSession } from '@/services/configs/appSession';
import { Input } from '@headlessui/react';
import { useSearchParams } from 'next/navigation';
import { ILineDetail } from '@/models/m_line_detail';

const TimeCapture = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);

    const [description, setDescription] = useState<string>('');
    const [station, setStation] = useState<string>('');
    const [employee, setEmployee] = useState<string>('');
    const [stepCode, setStepCode] = useState<string>('');
    const [cycleTime, setCycleTime] = useState<string>('00.000');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorString, setErrorString] = useState<string>('');

    const intervalIdRef: any = useRef<any>(null);
    const startTimeRef = useRef<number>(0);
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const [user, setUser] = useState<any>();
    const [workspaces, setWorkspaces] = useState<any[]>([]);
    const [appController] = useState<AppController>(new AppController());

    const [lineDetail, setLineDetail] = useState<ILineDetail>();

    const searchParams = useSearchParams();

    const xnw = searchParams.get('new') || '1';
    const id = searchParams.get('id') || null;
    const uid = searchParams.get('uid') || null;
    const wid = searchParams.get('wid') || null;
    const hid = searchParams.get('hid') || null;

    useEffect(() => {
        if (!lineDetail && xnw == '0' && id) {
            loadDetail();
        }
    }, [lineDetail]);

    const stepDuration = 60; // Each step is 60 ms
    let countStep = 0;

    useEffect(() => {
        if (isRunning) {
            if (elapsedTime > 0) {
                countStep = elapsedTime;
            }
            intervalIdRef.current = setInterval(() => {

                countStep++;
                setElapsedTime(countStep);
            }, stepDuration);
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
        setCycleTime('00.000');
        setIsRunning(false);
        setIsStarted(false);
        setErrorString('');
    }


    function formatTime() {
        const seconds = Math.floor(elapsedTime / (1000) % 60);
        const milliseconds = Math.floor((elapsedTime % 1000));

        const seconds_str = String(seconds).padStart(2, "0");
        const milliseconds_str = String(milliseconds).padStart(3, "0");

        return `${seconds_str}.${milliseconds_str}`;
    }

    const handleCreateDetail = (event: React.FormEvent) => {
        event.preventDefault();
        setErrorString('');
        //window.location.assign('/dashboard');

        setIsLoading(true);
        const seconds = Math.floor(elapsedTime / (1000) % 60);
        const milliseconds = Math.floor((elapsedTime % 1000));
        const time = seconds + (milliseconds / 1000);

        console.log(time);

        if (xnw == '1' && uid && wid && hid) {
            LineBalancingAPI.createDetail(
                uid,
                wid,
                hid,
                time,
                employee,
                description,
                station,
                stepCode
            ).then((response) => {
                setIsLoading(false);
                setErrorString(response.message);

                // AppSession.storeUser(res.user);
                // AppSession.storeWorkspaces(res.workspaces);
                // window.location.assign('/dashboard');
                /*AppSession.storeLastConfig({
                    line_balancing: {
                        hid: hid
                    }
                });*/
                window.location.assign(`/linebalancing?uid=${uid}&wid=${wid}&hid=${hid}`)
            }).catch(error => {
                console.log('ERR: ' + error);
                setErrorString('ERR: ' + error);

                setIsLoading(false);
                /*AppSession.storeLastConfig({
                    line_balancing: {
                        hid: hid
                    }
                });*/
                //window.location.assign(`/linebalancing?uid=${uid}&wid=${wid}&hid=${hid}`)
            });
        } else if (xnw == '0' && id && uid && wid && hid) {
            LineBalancingAPI.editDetail(id, {
                "cycle_time": time,
                "description": description,
                "employee": employee,
                "station": station,
                "step_code": stepCode
            }).then((response) => {
                setIsLoading(false);
                setErrorString(response.message);
                window.location.assign(`/linebalancing?uid=${uid}&wid=${wid}&hid=${hid}`)
            }).catch(error => {
                console.log('ERR: ' + error);
                setErrorString('ERR: ' + error);
                setIsLoading(false);
            });
        }
    }


    function bacgPage() {
        window.location.assign(`/linebalancing?uid=${uid}&wid=${wid}`)
    }

    async function loadDetail() {
        setIsLoading(true);
        try {
            const res = await LineBalancingAPI.getDetail(id!);
            const detail: ILineDetail = res.line_detail;
            setLineDetail(res.line_detail);
            setElapsedTime(detail.cycle_time);
            setDescription(detail.description ?? '');
            setStation(detail.station);
            setEmployee(detail.employee ?? '');
            setStepCode(detail.step_code);
            setCycleTime(detail.cycle_time.toFixed(3));
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }

    return (
        <>
            <NavBar user={user} path="/linebalancing" />
            <div className="mt-4 pl-32 pr-24 grid grid-cols-4 gap-6 mt-4 place-items-start">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Operation Code</label>
                    <Input
                        type="text"
                        onChange={(e) => setStepCode(e.target.value)}
                        value={stepCode}
                        className="w-60 px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Operation Description</label>
                    <Input
                        type="text"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        className="w-96 px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>
            <div className="pl-32 pr-24 grid grid-cols-4 gap-6 mt-4 place-items-start">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Station</label>
                    <Input
                        type="text"
                        onChange={(e) => setStation(e.target.value)}
                        value={station}
                        className="w-60 px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>


                <div>
                    <label className="block text-sm font-medium text-gray-700">Employee</label>
                    <Input
                        type="text"
                        onChange={(e) => setEmployee(e.target.value)}
                        value={employee}
                        className="w-60 px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Cycle Time</label>
                    <Input
                        readOnly={true}

                        type="text"
                        value={cycleTime}
                        onChange={(e) => setCycleTime(e.target.value)}
                        className="w-60 px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="justify-end">
                    <div className="flex gap-4 col-span-3 space-x-4 mt-5 justify-end">
                        {isLoading ? <button
                            className="px-6 py-2 bg-gray-50 text-gray-600 rounded-md shadow-md "
                            disabled={true}>
                            Saving...
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
                        <div className="flex flex-col items-end">
                            <label className="block text-sm font-medium text-gray-700">{errorString}</label>

                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-24 flex flex-col items-center">
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

        </>
    );
};

const TimeCapturePage: React.FC = () => {
    return (
        <Suspense fallback={<>Loading...</>}>
            <TimeCapture></TimeCapture>
        </Suspense>
    );
}

export default TimeCapturePage;
