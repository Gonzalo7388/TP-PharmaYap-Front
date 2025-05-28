import React from "react";
import { FiSearch, FiBell, FiUser } from "react-icons/fi";

const UserIcons: React.FC = () => {
  return (
    <div className="flex items-center space-x-4">
      <FiSearch className="text-gray-500 w-5 h-5 cursor-pointer" />
      <FiBell className="text-gray-500 w-5 h-5 cursor-pointer" />
      <div className="flex items-center">
        <span className="bg-[#f8e1e5] text-[#ca5c71] p-2 rounded-full">
          <FiUser className="h-5 w-5" />
        </span>
        <span className="ml-2 text-sm font-medium text-gray-700">Bienvenido</span>
      </div>
    </div>
  );
};

export default UserIcons;
