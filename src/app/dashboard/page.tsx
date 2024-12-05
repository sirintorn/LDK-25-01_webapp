"use client";
import { Select } from '@headlessui/react';
import { ChartBarIcon  } from '@heroicons/react/24/solid'
import { UserIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'

const Dashboard = () => {

  return (
    <div className="items-center min-h-screen bg-white">
      <header className="flex items-center px-8 py-8 bg-blue-500 text-white justify-between w-full">
                <h1 className="text-4xl font-semibold mx-auto">Dashboard</h1>
                <div className="flex w-20">
                    <button className="w-20">
                        <UserIcon />
                    </button>
                    <button className="w-20">
                        <ArrowRightStartOnRectangleIcon />
                    </button>
                </div>
      </header>
      <div className="items-center mt-20 w-full pl-60">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Workspace
          </label>
          <Select className="block w-64 text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" name="status" aria-label="Project status">
            <option value="active"></option>
            <option value="paused"></option>
            <option value="delayed"></option>
            <option value="canceled"></option>
          </Select>
        </div>
      </div>

      <div className="flex flex-col items-center mt-16 w-full pr-60 pl-60">
        <button
          className="w-full bg-blue-500 text-white font-semibold text-xl py-20 rounded-md shadow-md hover:bg-blue-600 transition"
        >
          <div className="flex items-center justify-center space-x-2">
            <ChartBarIcon className='w-9'/>
            <span className='text-4xl'>Hydy Line Balancing</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
