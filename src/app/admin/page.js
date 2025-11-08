"use client";
import { SideBar } from "./_features/sideBar";
import { FoodMenuSection } from "./_features/foodMenuSection";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) router.push("/login");
    }
  }, []);
  return (
    <div className="bg-[#f2f0f0] h-screen flex w-full gap-10">
      <SideBar logo={"favicon.ico"} />
      <FoodMenuSection />
    </div>
  );
}
