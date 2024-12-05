"use client";
import { UserIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'

const TimeCapture = () => {

    return (
        <div className="min-h-screen bg-white">
            <header className="flex items-center px-8 py-8 bg-blue-500 text-white justify-between w-full">
                <h1 className="text-4xl font-semibold mx-auto">Time Capture</h1>
                <div className="flex w-20">
                    <button className="w-20">
                        <UserIcon />
                    </button>
                    <button className="w-20">
                        <ArrowRightStartOnRectangleIcon />
                    </button>
                </div>
            </header>

            <div className="p-8">
                <div className="grid grid-cols-6 gap-32 mb-8">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Step Code</label>
                        <input
                            type="text"
                            className="w-60 px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <input
                            type="text"
                            className="w-96 px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
                <div className='grid grid-cols-6 mb-8 gap-52'>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Station</label>
                        <input
                            type="text"
                            className="w-60 px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Employee</label>
                        <input
                            type="text"
                            className="w-60 px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Cycle Time</label>
                        <input
                            type="text"
                            className="w-60 px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="flex gap-4 col-span-3 space-x-4 mt-5 justify-end">
                        <button className="px-6 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition">
                            Save
                        </button>
                        <button className="px-6 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition">
                            Cancel
                        </button>
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <div className="font-bold text-black"><span className='text-[200px]'>0.000</span></div>
                    <div className="flex space-x-4 mt-4">
                        <button
                            className="px-6 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition"
                        >
                            Start/Stop
                        </button>
                        <button
                            className="px-6 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition"
                        >
                            Reset
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TimeCapture;
