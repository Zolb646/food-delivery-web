"use client";
import { SideBar } from "./_features/sideBar";
import { FoodMenuSection } from "./_features/foodMenuSection";

export default function AdminPage() {
  return (
    <div className="bg-[#f2f0f0] h-screen flex w-full gap-10">
      <SideBar logo={"favicon.ico"} />
      <FoodMenuSection />
    </div>
  );
}
