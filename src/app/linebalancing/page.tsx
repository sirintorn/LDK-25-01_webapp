/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import BarChart from '@/components/charts/BarChart';
import NavBar from '@/components/layouts/NavBar';
import Loading from '@/components/misc/Loading';
import { ChartGen } from '@/services/agents/chart_gen';
import { ColorPalette } from '@/services/agents/color_pellete';
import { FnLineBalancing } from '@/services/agents/fn_line_balancing';
import { AppSession } from '@/services/configs/appSession';
import { AppConfig } from '@/services/configs/config';
import { AppController } from '@/services/controllers/app_controller';
import { LineBalancingController } from '@/services/controllers/line_balancing_controller';
import { Button, Input, Select } from '@headlessui/react';
import { AdjustmentsVerticalIcon, UserIcon, UserGroupIcon, UserPlusIcon, ArrowRightStartOnRectangleIcon, TrashIcon, ClockIcon, ChatBubbleBottomCenterTextIcon, PresentationChartLineIcon, HandRaisedIcon } from '@heroicons/react/24/outline'
import { ChartData, ChartOptions } from 'chart.js';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const Linebalancing = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [user, setUser] = useState<any>();
    const [workspaces, setWorkspaces] = useState<any[]>([]);
    const [appController, setAppController] = useState<AppController>(new AppController());
    const [controller, setController] = useState<LineBalancingController>(new LineBalancingController());

    const [lines, setLines] = useState<any[]>([]);
    const [models, setModels] = useState<any[]>([]);

    const [lineHeader, setLineHeader] = useState<any>();
    const [lineDetails, setLineDetails] = useState<any[]>();
    const [lineDetailsChecks, setLineDetailsChecks] = useState<boolean[]>();

    const [taktTime, setTaktTime] = useState<number>();
    const [unitPerHour, setUnitPerHour] = useState<number>();
    const [totalCycleTime, setTotalCycleTime] = useState<number>();
    const [cycleTimeMax, setCycleTimeMax] = useState<number>();
    const [percentOTPBottleneck, setPercentOTPBottleneck] = useState<number>();
    const [percentBalance, setPercentBalance] = useState<number>();
    const [bottleneckStation, setBottleneckStation] = useState<string>();
    const [bottleneckOutput, setBottleneckOutput] = useState<number>();
    const [totalWorkStation, setTotalWorkStation] = useState<number>();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [chartData, setChartData] = useState<ChartData<'bar'>>(ChartGen.smartGenerateChartData(0, []));

    // Define the configuration for the chart
    // eslint-disable-next-line react-hooks/exhaustive-deps

    const options: ChartOptions<'bar'> = {
        /*onClick(event, elements, chart) {
            if (elements.length > 0) {
                let e = elements[0] as any;
                const index = e.element.$context.index;
                const barLabels = chart.data.labels;
                const empLabel = barLabels![index] as string;
                const EmpID = empLabel.split(':')[0];
                controller.empLocation = `${EmpID}`;
                controller.sortHilightDetailsToTop();
                //window.location.href = `#firstrow`;
                window.location.href = `#${EmpID}`;
            } else {
                controller.empLocation = null;
                controller.sortDetailsBySerialNumber();
                console.log('out')
            }
        },*/
        plugins: {
            title: {
                display: true,
                text: 'Yamazumi Chart with Stage Time',
            },
            tooltip: {
                enabled: true,
                mode: 'point',
                intersect: true,
            },
            legend: {
                display: false,
                position: 'top',
            },
            colors: {
                enabled: false,
                forceOverride: true
            },
            annotation: {
                annotations: {
                    Line: {
                        type: 'line',
                        yMin: controller.line_header ? controller.line_header.takt_time : 0,
                        yMax: controller.line_header ? controller.line_header.takt_time : 0,
                        borderColor: 'rgb(255, 0, 0)',
                        borderWidth: 2,
                    }
                }
            }
        },
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            x: {
                stacked: true,
                ticks: {
                    maxRotation: 90,
                    minRotation: 15
                },
                beginAtZero: true
            },
            y: {
                stacked: true,
                suggestedMax: ((controller.line_header ? controller.line_header.takt_time:  0)+1)
            },
        },
    };

    const uid = searchParams.get('uid') || null;
    const wid = searchParams.get('wid') || null;

    useEffect(() => {
        AppConfig.forceInspectLogin();
        if (!user) {
            appController.init(AppSession.getUser(), AppSession.getWorkspaces());
            
            if(uid && wid) controller.init(uid, wid);
            else controller.init(appController.user._id, appController.workspaces[appController.targetWorkspace]._id);

            setUser(appController.user);
            setWorkspaces(appController.workspaces);
        }

        const last_config = AppSession.getLastConfig();
        if(last_config && !isNaN(last_config.target_line)){
            controller.target_line = last_config.target_line;
            if(last_config && !isNaN(last_config.target_model)){
                controller.target_model = last_config.target_model;
                syncHeader();
            }
        }

        if (!uiUpdater) {
            setUIUpdater(setInterval(updateUI, 1000));
        }
    }, [user, appController, workspaces, controller]);

    const [uiUpdater, setUIUpdater] = useState<any>(null);
    function updateUI() {
        if (controller?.isLoading) setIsLoading(controller.isLoading);
        if (controller?.lines) setLines(controller.lines);
        if (controller?.models) setModels(controller.models);
        if (controller?.line_header) setLineHeader(controller.line_header);
        if (controller?.line_details) {
            setLineDetails(controller.line_details);
            const ctmax = FnLineBalancing.findCycleTimeMax(controller.line_details);
            setCycleTimeMax(ctmax.cycle_time_max);
            const perOtpBn = FnLineBalancing.percentOTPBottleneck(controller.line_header.takt_time, ctmax.cycle_time_max);
            setPercentOTPBottleneck(perOtpBn);
            const totCt = FnLineBalancing.totalCycleTime(controller.line_details);
            const totSt = FnLineBalancing.totalWorkstation(controller.line_details);
            const perBln = FnLineBalancing.percentBalance(totCt, ctmax.cycle_time_max, totSt.total_count);
            setPercentBalance(perBln);
            const bnSt = FnLineBalancing.findBottleneckStation(controller.line_details);
            setBottleneckStation(bnSt ?? '-');
            const bnOut = FnLineBalancing.bottleneckOutput(ctmax.cycle_time_max);
            setBottleneckOutput(bnOut);
            setTotalWorkStation(totSt.total_count);
            setTotalCycleTime(totCt);
        }
    }

    function onClickAddDetail(event: any) {
        router.push(`/timecapture?new=1&uid=${appController.user._id}&wid=${appController.workspaces[appController.targetWorkspace]._id}`);
    }

    function syncHeader(){
        controller.syncHeader().then(() => {
            AppSession.storeLastConfig({
                target_line: controller.target_line,
                target_model: controller.target_model
            });
            setTaktTime(controller.line_header ? controller.line_header.takt_time : 0);
            setUnitPerHour(controller.line_header ? controller.line_header.unit_per_hour : 0);
            if (controller.line_details) {
                let bools: boolean[] = [];
                controller.line_details.forEach(() => {
                    bools.push(false);
                });
                setLineDetailsChecks(bools);
                const chartData = ChartGen.smartGenerateChartData(controller.line_header.takt_time ?? 0, controller.line_details ?? []);
                setChartData(chartData);
            }
        });
    }

    function onChangeLine(event: any) {
        controller.target_line = Number(event.target.value ?? -1);
        syncHeader();
    }

    function onChangeModel(event: any) {
        controller.target_model = Number(event.target.value ?? -1);
        syncHeader();
    }

    function onChangeTaktTime(event: any) {
        const val1 = Number(event.target.value ?? -1);
        const val2 = FnLineBalancing.taktTimeToUnitPerHour(val1);
        controller.line_header.takt_time = val1;
        controller.line_header.unit_per_hour = val2;
        controller.editHeader();
        setTaktTime(controller.line_header.takt_time);
        setUnitPerHour(controller.line_header.unit_per_hour);
        const chartData = ChartGen.smartGenerateChartData(controller.line_header.takt_time ?? 0, controller.line_details ?? []);
        setChartData(chartData);
    }

    function onChangeUnitPerHour(event: any) {
        const val1 = Number(event.target.value ?? -1);
        const val2 = FnLineBalancing.unitPerHourToTaktTime(val1);
        controller.line_header.takt_time = val2;
        controller.line_header.unit_per_hour = val1;
        controller.editHeader();
        setTaktTime(controller.line_header.takt_time);
        setUnitPerHour(controller.line_header.unit_per_hour);
        const chartData = ChartGen.smartGenerateChartData(controller.line_header.takt_time ?? 0, controller.line_details ?? []);
        setChartData(chartData);
    }

    function onChangeCheckDetail(i: number) {
        console.log('checked at: ' + i);
        if (lineDetailsChecks) lineDetailsChecks[i] = !lineDetailsChecks[i];
        setLineDetailsChecks(lineDetailsChecks);
    }

    function onClickDelete() {
        let ids = [];
        if (confirm('Are you sure?')) {
            try {
                for (let i = lineDetailsChecks!.length - 1; i > -1; i--) {
                    const bool = lineDetailsChecks![i];
                    if (bool) {
                        ids.push(lineDetails![i]._id);
                        lineDetails?.splice(i, 1);
                        lineDetailsChecks?.splice(i, 1);
                    }
                }
                console.log(ids);
                controller.deleteDetails(ids);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <NavBar user={user} path="/linebalancing" />
            <div className="min-h-screen bg-white">
                <div className="p-8 space-y-8">
                    <div className="grid grid-cols-5 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Line</label>
                            <Select value={controller.target_line} onChange={onChangeLine} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                                <option value="">Select</option>
                                {lines?.map((obj, i) => {
                                    return (
                                        <option value={i} key={i}>
                                            {obj.name}: {obj.code}
                                        </option>
                                    );
                                })}
                            </Select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Model/Style</label>
                            <Select value={controller.target_model} onChange={onChangeModel} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                                <option value="">Select</option>
                                {models?.map((obj, i) => {
                                    return (
                                        <option value={i} key={i}>
                                            {obj.name}: {obj.code}
                                        </option>
                                    );
                                })}
                            </Select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Takt Time</label>
                            <Input
                                type="number"
                                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                value={taktTime ? taktTime.toFixed(3) : ''}
                                onChange={onChangeTaktTime}
                                disabled={!lineHeader}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Unit/Hour</label>
                            <Input
                                type="number"
                                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                value={unitPerHour ? unitPerHour.toFixed(0) : ''}
                                onChange={onChangeUnitPerHour}
                                disabled={!lineHeader}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Total Cycle Time</label>
                            <Input
                                type="number"
                                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                value={totalCycleTime ? totalCycleTime.toFixed(3) : ''}
                                disabled={true}
                            />
                        </div>
                    </div>


                    <div className="grid grid-cols-6 gap-4 text-center rounded-lg px-4 ">
                        <div className="flex flex-col items-center bg-white text-black border border-gray-300 p-6 rounded-md shadow-sm">
                            <div className="w-10 mb-2">
                                <ClockIcon />
                            </div>
                            <h3 className="text-lg font-medium mb-1 text-center">Cycle Time max</h3>
                            <p className="text-3xl font-bold text-center">{cycleTimeMax ? cycleTimeMax.toFixed(3) : '000'}</p>
                        </div>

                        <div className="flex flex-col items-center bg-white text-black border border-gray-300 p-6 rounded-md shadow-sm">
                            <div className="w-10 mb-2">
                                <ChatBubbleBottomCenterTextIcon />
                            </div>
                            <h3 className="text-lg">%OTP Bottleneck</h3>
                            <p className="text-3xl font-bold">{percentOTPBottleneck ? percentOTPBottleneck.toFixed(2) : '000'}</p>
                        </div>
                        <div className="flex flex-col items-center bg-white text-black border border-gray-300 p-6 rounded-md shadow-sm">
                            <div className="w-10 mb-2">
                                <PresentationChartLineIcon />
                            </div>
                            <h3 className="text-lg">%Balance</h3>
                            <p className="text-3xl font-bold">{percentBalance ? percentBalance.toFixed(2) : '000'}</p>
                        </div>
                        <div className="flex flex-col items-center bg-white text-black border border-gray-300 p-6 rounded-md shadow-sm">
                            <div className="w-10 mb-2">
                                <HandRaisedIcon />
                            </div>
                            <h3 className="text-lg">Bottleneck Station</h3>
                            <p className="text-3xl font-bold">{bottleneckStation ?? '000'}</p>
                        </div>
                        <div className="flex flex-col items-center bg-white text-black border border-gray-300 p-6 rounded-md shadow-sm">
                            <div className="w-10 mb-2">
                                <AdjustmentsVerticalIcon />
                            </div>
                            <h3 className="text-lg">Bottleneck Output</h3>
                            <p className="text-3xl font-bold">{bottleneckOutput ? bottleneckOutput.toFixed(3) : '000'}</p>
                        </div>
                        <div className="flex flex-col items-center bg-white text-black border border-gray-300 p-6 rounded-md shadow-sm">
                            <div className="w-10 mb-2">
                                <UserGroupIcon />
                            </div>
                            <h3 className="text-lg">Total Workstation</h3>
                            <p className="text-3xl font-bold">{totalWorkStation ?? '000'}</p>
                        </div>
                    </div>

                    <div className="p-4 rounded-md">
                        {(isLoading) && <Loading></Loading>}
                        {(!isLoading) &&
                            <>
                                <BarChart data={chartData} options={options} />
                                <div className="flex justify-between mt-8">
                                    <div className="text-center font-bold text-black">
                                        <Button onClick={onClickAddDetail} className="flex items-center px-4 py-2 border border-blue-600 text-blue-600 font-semibold text-sm rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                            <UserPlusIcon className='h-7 w-7 text-blue' />
                                        </Button>
                                    </div>
                                    <div className="text-center font-bold text-black">
                                        <Button onClick={onClickDelete} className="flex items-center px-4 py-2 border border-red-600 text-red-600 font-semibold text-sm rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                                            <TrashIcon className='h-7 w-7 text-red' />
                                        </Button>
                                    </div>
                                </div>

                                <table className="w-full border border-gray-300 text-black mt-4">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="px-4 py-2 border">No</th>
                                            <th className="px-4 py-2 border">Step Code</th>
                                            <th className="px-4 py-2 border">Description</th>
                                            <th className="px-4 py-2 border">Station</th>
                                            <th className="px-4 py-2 border">Employee</th>
                                            <th className="px-4 py-2 border">Cycle Time</th>
                                            <th className="px-4 py-2 border">Record By</th>
                                            <th className="px-4 py-2 border">Status</th>
                                            <th className="px-4 py-2 border">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {lineDetails?.map((obj, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td className="px-4 py-2 border text-center colSpan-9">
                                                        {i + 1}
                                                    </td>
                                                    <td className="px-4 py-2 border text-center colSpan-9">
                                                        <a href={`/timecapture?new=0&id=${obj._id}`} className='text-blue-500 hover:text-blue-700 underline font-semibold'>{obj.step_code ?? '-'}</a>
                                                    </td>
                                                    <td className="px-4 py-2 border text-center colSpan-9">
                                                        {obj.description ?? '-'}
                                                    </td>
                                                    <td className="px-4 py-2 border text-center colSpan-9">
                                                        {obj.station ?? '-'}
                                                    </td>
                                                    <td className="px-4 py-2 border text-center colSpan-9">
                                                        {obj.employee ?? '-'}
                                                    </td>
                                                    <td className="px-4 py-2 border text-center colSpan-9">
                                                        {obj.cycle_time ?? '-'}
                                                    </td>
                                                    <td className="px-4 py-2 border text-center colSpan-9">
                                                        {appController.user.display_name ?? '-'}
                                                    </td>
                                                    <td style={{ background: FnLineBalancing.detailStatus(taktTime ?? 0, obj, lineDetails).bg }} className="px-4 py-2 border text-center colSpan-9">
                                                        {FnLineBalancing.detailStatus(taktTime ?? 0, obj, lineDetails).bg}
                                                    </td>
                                                    <td className="px-4 py-2 border text-center colSpan-9">
                                                        <Input
                                                            type='checkbox'
                                                            onChange={() => onChangeCheckDetail(i)}
                                                        ></Input>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Linebalancing;
