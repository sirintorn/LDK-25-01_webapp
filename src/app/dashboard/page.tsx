/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Select } from '@headlessui/react';
import { ChartBarIcon } from '@heroicons/react/24/solid'
import NavBar from '@/components/layouts/NavBar';
import { useEffect, useState } from 'react';
import { AppController } from '@/services/controllers/app_controller';
import { AppConfig } from '@/services/configs/config';
import { AppSession } from '@/services/configs/appSession';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const router = useRouter();
  
  const [user, setUser] = useState<any>();
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [appController, setAppController] = useState<AppController>(new AppController());

  useEffect(() => {
    AppConfig.forceInspectLogin();
    if (!user) {
      appController.init(AppSession.getUser(), AppSession.getWorkspaces())
      setUser(appController.user);
      setWorkspaces(appController.workspaces);
    }

  }, [user, appController, workspaces]);

  function onChangeWorkspace(event: any) {
    console.log('val:' + event.value);
  }

  function onClickLineBalancing(event: any) {
    router.push(`/linebalancing?uid=${user._id}&wid=${workspaces[appController.targetWorkspace]._id}`);
  }

  return (
    <>
      <NavBar user={user} path="/dashboard" />
      <div className="items-center min-h-screen bg-white pt-20">
        <div className="items-center w-full pl-60">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Workspace
            </label>
            <Select onChange={onChangeWorkspace} className="block w-64 text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" name="status" aria-label="Project status">
              {workspaces?.map((obj, i) => {
                return (
                  <option value={obj.id} key={i}>
                    {obj.name}
                  </option>
                );
              })}
            </Select>
          </div>
        </div>

        <div className="flex flex-col items-center mt-16 w-full pr-60 pl-60">
          <button
            onClick={onClickLineBalancing}
            className="w-full bg-blue-500 text-white font-semibold text-xl py-20 rounded-md shadow-md hover:bg-blue-600 transition"
          >
            <div className="flex items-center justify-center space-x-2">
              <ChartBarIcon className='w-9' />
              <span className='text-4xl'>Hydy Line Balancing</span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
