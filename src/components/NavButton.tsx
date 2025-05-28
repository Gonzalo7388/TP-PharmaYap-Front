import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface NavButtonProps {
  to: string;
  label: string;
  icon: React.ReactNode;
}

const NavButton: React.FC<NavButtonProps> = ({ to, label, icon }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = location.pathname === to;
  const activeClass = isActive
    ? "border-[#ca5c71] text-[#ca5c71]"
    : "border-transparent text-gray-600 hover:text-[#ca5c71] hover:border-[#ca5c71]";

  return (
    <button
      onClick={() => navigate(to)}
      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${activeClass}`}
    >
      {icon}
      {label}
    </button>
  );
};

export default NavButton;
