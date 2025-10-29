"use client";
import { LuLayoutDashboard } from "react-icons/lu";
import { FiTruck } from "react-icons/fi";
import { Button } from "@/components/ui/button";
export const SideBarButtons = ({ background, setBackground }) => {
  return (
    <div className="w-full h-26 flex flex-col justify-between">
      <Button
        className={`rounded-full h-10 ${
          !background ? "" : "bg-white text-black"
        }`}
        onClick={() => setBackground(!background)}
      >
        <div className="w-full h-full flex items-center px-4 gap-2.5">
          <LuLayoutDashboard className="size-5" />
          <span className="text-sm font-medium">Food Name</span>
        </div>
      </Button>
      <Button
        className={`rounded-full h-10 ${
          !background ? "bg-white text-black" : ""
        }`}
        onClick={() => setBackground(!background)}
      >
        <div className="w-full h-full flex items-center px-4 gap-2.5">
          <FiTruck className="size-5" />
          <span className="text-sm font-medium">Orders</span>
        </div>
      </Button>
    </div>
  );
};
