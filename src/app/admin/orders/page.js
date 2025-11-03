"use client";
import { useState } from "react";
import { OrderSection } from "../_features/orderSection";
import { SideBar } from "../_features/sideBar";
import { FiX } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { set } from "date-fns";
import { FormatStatus } from "../_components/formatStatus";
import { se } from "date-fns/locale";

const options = {
  method: "PATCH",
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MDA0NjFlZTJkYjUyMTk3ODM1ZDlmZiIsImVtYWlsIjoiem9sYjY0NkBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NjE2MjU2NTUsImV4cCI6MTc2MjIzMDQ1NX0.lMosgQwpXzQlke1v_mWbVwE0R0vhMExXz-pZ0bLA4kE",
  },
};

export default function AdminPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#f2f0f0] h-screen flex w-full gap-10 relative">
      <SideBar logo={"/favicon.ico"} />
      <OrderSection setIsOpen={setIsOpen} />

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-91 relative flex flex-col gap-6">
            <div className="w-full h-fit flex items-center justify-between">
              <p className="font-semibold">Change delivery state</p>
              <button
                className="p-2 bg-gray-200 rounded-full"
                onClick={() => setIsOpen(false)}
              >
                <FiX />
              </button>
            </div>
            <div className="w-full flex justify-between items-center">
              {["DELIVERED", "PENDING", "CANCELLED"].map((status) => (
                <button
                  key={status}
                  className={`px-4 py-1.5 rounded-full text-sm transition-all duration-150 
                    `}
                >
                  {FormatStatus(status)}
                </button>
              ))}
            </div>
            <Button className="w-full rounded-full">Save</Button>
          </div>
        </div>
      )}
    </div>
  );
}
