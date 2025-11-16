"use client";
import { SideBar } from "./_features/sideBar";
import { FoodMenuSection } from "./_features/foodMenuSection";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { NoAccessPanel } from "../_components/noAccessPanel";

export default function AdminPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedToken = localStorage.getItem("token");

    if (!savedToken) {
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(savedToken);

      setToken(savedToken);
      setUserRole(decoded.role || "NOT_ADMIN");
    } catch (err) {
      setUserRole("NOT_ADMIN");
    }

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-500">
        Checking permissions...
      </div>
    );
  }

  if (!token || userRole === "NOT_ADMIN") {
    return <NoAccessPanel router={router} />;
  }

  return (
    <div className="bg-[#f2f0f0] h-screen flex w-full gap-10">
      <SideBar logo={"favicon.ico"} />
      <FoodMenuSection />
    </div>
  );
}
