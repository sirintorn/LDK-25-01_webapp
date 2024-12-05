import React from "react";
import { UserIcon, ArrowRightStartOnRectangleIcon  } from '@heroicons/react/24/outline'

const Header = () => {
  return (
    <header className="flex items-center px-8 py-8 bg-blue-500 text-white justify-between w-full">
    <h1 className="text-2xl font-semibold mx-auto">Dashboard</h1>
    <div className="flex w-20">
    <button className="w-20">
      <UserIcon />
    </button>
    <button className="w-20">
      <ArrowRightStartOnRectangleIcon />
    </button>
    </div>
  </header>
  );
};

export default Header;
