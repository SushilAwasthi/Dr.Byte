import React from "react";

interface SidebarProps {
  onSelect: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
  return (
    <div className="w-1/5 h-screen bg-gray-800 text-white p-4 shadow-lg rounded-lg pt-[100px]">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Menu</h2>
      <ul>
        <li className="mb-4">
          <button 
            onClick={() => onSelect("users")} 
            className="w-full text-left p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Users
          </button>
        </li>
        <li className="mb-4">
          <button 
            onClick={() => onSelect("stats")} 
            className="w-full text-left p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Stats
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
