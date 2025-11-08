"use client";
import { useEffect } from "react";
import { OrderSection } from "../_features/orderSection";
import { SideBar } from "../_features/sideBar";
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
    <div className="bg-[#f2f0f0] h-screen flex w-full gap-10 relative">
      <SideBar logo={"/favicon.ico"} />
      <OrderSection />
    </div>
  );
}
