"use client";
import { UserIcon, ArrowRightStartOnRectangleIcon, TrashIcon, ClockIcon ,ChatBubbleBottomCenterTextIcon ,PresentationChartLineIcon } from '@heroicons/react/24/outline'

const Linebalancing = () => {

    return (
        <div className="min-h-screen bg-white">
            <header className="flex items-center px-8 py-8 bg-blue-500 text-white justify-between w-full">
                <h1 className="text-4xl font-semibold mx-auto">Hydy Line Balancing</h1>
                <div className="flex w-20">
                    <button className="w-20">
                        <UserIcon />
                    </button>
                    <button className="w-20">
                        <ArrowRightStartOnRectangleIcon />
                    </button>
                </div>
            </header>

            <div className="p-8 space-y-8">
                <div className="grid grid-cols-5 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Line</label>
                        <select className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Select</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Model/Style</label>
                        <select className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Select</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Takt Time</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Unit/Hour</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Total Cycle Time</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>


                <div className="grid grid-cols-6 gap-4 text-center rounded-lg p-4 ">
                    <div className="flex flex-col items-center bg-white text-black border border-gray-300 p-6 rounded-md shadow-sm">
                        <div className="w-10 mb-2">
                            <ClockIcon />
                        </div>
                        <h3 className="text-lg font-medium mb-1 text-center">Cycle Time max</h3>
                        <p className="text-3xl font-bold text-center">000</p>
                    </div>

                    <div className="flex flex-col items-center bg-white text-black border border-gray-300 p-6 rounded-md shadow-sm">
                        <div className="w-10 mb-2">
                            <ChatBubbleBottomCenterTextIcon />
                        </div>
                        <h3 className="text-lg">%OTP Bottleneck</h3>
                        <p className="text-3xl font-bold">000</p>
                    </div>
                    <div className="flex flex-col items-center bg-white text-black border border-gray-300 p-6 rounded-md shadow-sm">
                    <div className="w-10 mb-2">
                            <PresentationChartLineIcon />
                        </div>
                        <h3 className="text-lg">%Balance</h3>
                        <p className="text-3xl font-bold">000</p>
                    </div>
                    <div className="flex flex-col items-center bg-white text-black border border-gray-300 p-6 rounded-md shadow-sm">
                    <div className="w-10 mb-2">
                            <PresentationChartLineIcon />
                        </div>
                        <h3 className="text-lg">Bottleneck Station</h3>
                        <p className="text-3xl font-bold">000</p>
                    </div>
                    <div className="flex flex-col items-center bg-white text-black border border-gray-300 p-6 rounded-md shadow-sm">
                    <div className="w-10 mb-2">
                            <PresentationChartLineIcon />
                        </div>
                        <h3 className="text-lg">Bottleneck Output</h3>
                        <p className="text-3xl font-bold">000</p>
                    </div>
                    <div className="flex flex-col items-center bg-white text-black border border-gray-300 p-6 rounded-md shadow-sm">
                    <div className="w-10 mb-2">
                            <PresentationChartLineIcon />
                        </div>
                        <h3 className="text-lg">Total Workstation</h3>
                        <p className="text-3xl font-bold">000</p>
                    </div>
                </div>


                <div className="bg-gray-100 p-4 rounded-md">
                    <div className="text-center font-bold text-black">Bar Chart</div>
                </div>
                <div className="flex justify-between">
                    <div className="text-center font-bold text-black">
                        <button className="w-10">
                            <UserIcon />
                        </button>
                    </div>
                    <div className="text-center font-bold text-black">
                        <button className="w-10">
                            <TrashIcon />
                        </button>
                    </div>
                </div>

                <table className="w-full border border-gray-300 text-black">
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
                        <tr>
                            <td className="px-4 py-2 border text-center colSpan-9">

                            </td>
                            <td className="px-4 py-2 border text-center colSpan-9">

                            </td>
                            <td className="px-4 py-2 border text-center colSpan-9">

                            </td>
                            <td className="px-4 py-2 border text-center colSpan-9">

                            </td>
                            <td className="px-4 py-2 border text-center colSpan-9">

                            </td>
                            <td className="px-4 py-2 border text-center colSpan-9">

                            </td>
                            <td className="px-4 py-2 border text-center colSpan-9">

                            </td>
                            <td className="px-4 py-2 border text-center colSpan-9">

                            </td>
                            <td className="px-4 py-2 border text-center colSpan-9">

                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default Linebalancing;
