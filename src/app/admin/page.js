"use client";
import { SideBar } from "./_features/sideBar";
import { FoodMenuSection } from "./_features/foodMenuSection";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { NoAccessPanel } from "../_components/noAccessPanel";

export default function AdminPage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) router.push("/login");
    }
    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      setUserRole(decoded.role);

      if (decoded.role !== "ADMIN") {
        setUserRole("NOT_ADMIN");
      }
    } catch (err) {
      console.error("Invalid token", err);
      router.push("/login");
    }
  }, []);
  if (userRole === null) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-500">
        Checking permissions...
      </div>
    );
  }
  if (userRole === "NOT_ADMIN") {
    return <NoAccessPanel router={router} />;
  }
  return (
    <div className="bg-[#f2f0f0] h-screen flex w-full gap-10">
      <SideBar logo={"favicon.ico"} />
      <FoodMenuSection />
    </div>
  );
}
