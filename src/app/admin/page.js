"use client";
import { SideBar } from "../_features/sideBar";
import { OrderSection } from "../_features/orderSection";
import { useState } from "react";
import { FoodMenuSection } from "../_features/foodMenuSection";

export default function AdminPage() {
  const [background, setBackground] = useState(true);
  return (
    <div className="bg-[#f2f0f0] h-screen flex w-full gap-10">
      <SideBar background={background} setBackground={setBackground} />
      {!background ? <FoodMenuSection /> : <OrderSection />}
    </div>
  );
}
