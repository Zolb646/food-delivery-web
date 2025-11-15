"use client";
import { useEffect, useState } from "react";
import { OrderSection } from "../_features/orderSection";
import { SideBar } from "../_features/sideBar";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { NoAccessPanel } from "@/app/_components/noAccessPanel";

export default function AdminPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(storedToken);

      setToken(storedToken);
      setUserRole(decoded.role || "NOT_ADMIN");
    } catch (err) {
      console.error("Invalid token", err);
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

  if (!token || userRole !== "ADMIN") {
    return <NoAccessPanel router={router} />;
  }

  return (
    <div className="bg-[#f2f0f0] h-screen flex w-full gap-10 relative">
      <SideBar logo={"/favicon.ico"} />
      <OrderSection />
    </div>
  );
}
