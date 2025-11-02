"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { RxCaretSort } from "react-icons/rx";
import { FormatStatus } from "./formatStatus";

const options = {
  method: "PATCH",
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MDA0NjFlZTJkYjUyMTk3ODM1ZDlmZiIsImVtYWlsIjoiem9sYjY0NkBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NjE2MjU2NTUsImV4cCI6MTc2MjIzMDQ1NX0.lMosgQwpXzQlke1v_mWbVwE0R0vhMExXz-pZ0bLA4kE",
  },
};

export const OrderList = ({
  className,
  foodnums,
  Customer,
  Total,
  Address,
  date,
  handleCheckboxChange,
  isChecked,
  num,
  status,
  orderId,
  foods,
}) => {
  const [currentStatus, setCurrentStatus] = useState(status);

  console.log("OrderList food:", foods);

  const patchData = async (newStatus) => {
    try {
      const res = await fetch(`http://localhost:8000/food-order/${orderId}`, {
        ...options,
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      const json = await res.json();
      console.log("Updated:", json);
    } catch (err) {
      console.error(err);
    }
  };

  const formattedDate = new Date(date)
    .toLocaleDateString("en-CA")
    .replace(/-/g, "/");

  const handleChange = (e) => {
    handleCheckboxChange(e.target.checked);
  };

  return (
    <div
      className={`w-full h-[63px] flex items-center justify-between border-b border-[#e4e4e7] 2xl:px-5 ${className} ${
        isChecked ? "bg-[#f2f0f0]" : "bg-white"
      }`}
    >
      <input
        type="checkbox"
        className="size-4.5 mx-5"
        checked={isChecked}
        onChange={handleChange}
      />
      <div className="pl-4 pr-6 gap-2.5 text-base">{num}</div>
      <p className="px-5 font-medium text-[#71717A] w-2xs">{Customer}</p>

      <div className="px-5 font-medium text-[#71717A] w-43 flex items-center justify-between">
        {foodnums} {foodnums === 1 ? "food" : "foods"}{" "}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="p-0 size-5">
              <FaAngleDown />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-fit p-2 shadow-lg">
            <div className="h-fit w-60 flex flex-col gap-2.5 p-2">
              {foods.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center"
                >
                  <img
                    src={`http://localhost:8000${item.food.imageUrl}`}
                    className="w-8 h-7.5 rounded-sm"
                  />
                  <span className="w-39 text-xs">{item.food.foodName}</span>
                  <span className="text-xs">x {item.quantity}</span>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="px-5 flex justify-between items-center w-43 font-medium text-[#71717A]">
        {formattedDate}
      </div>

      <p className="px-5 w-43 font-medium text-[#71717A]">{Total}</p>

      <p className="w-2xs px-5 font-medium text-[#71717A]">{Address}</p>

      <div className="w-3xs px-5 flex items-center justify-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`flex items-center font-semibold rounded-full px-2.5 py-0.5 ${
                currentStatus === "DELIVERED"
                  ? " border-green-500"
                  : currentStatus === "PENDING"
                  ? "  border-red-500"
                  : ""
              }`}
            >
              {FormatStatus(currentStatus)}
              <RxCaretSort className="size-5" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-fit p-2 shadow-lg" align="start">
            <div className="h-fit w-35 flex flex-col gap-2.5 p-1">
              {["DELIVERED", "PENDING", "CANCELLED"].map((item) => (
                <button
                  key={item}
                  className={`rounded-full py-0.5 bg-gray-100 text-xs w-fit px-2.5 font-semibold hover:bg-gray-200 ${
                    currentStatus === item
                      ? " cursor-not-allowed bg-red-500/10 border-red-500 border text-red-500"
                      : ""
                  }`}
                  disabled={currentStatus === FormatStatus(item)}
                  onClick={() => {
                    patchData(item);
                    setCurrentStatus(item);
                  }}
                >
                  {FormatStatus(item)}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
