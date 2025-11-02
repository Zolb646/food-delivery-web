"use client";
import { LuLayoutDashboard } from "react-icons/lu";
import { FiTruck } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";

export const SideBarButtons = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isOrdersPage = pathname.includes("/admin/orders");
  const isMenuPage = pathname === "/admin" || pathname.includes("/admin/food");

  return (
    <div className="w-full h-26 flex flex-col justify-between">
      <Button
        className={`rounded-full h-10 transition-colors ${
          isMenuPage ? "bg-black text-white" : "bg-white text-black"
        }`}
        onClick={() => router.push("/admin")}
      >
        <div className="w-full h-full flex items-center px-4 gap-2.5">
          <LuLayoutDashboard className="size-5" />
          <span className="text-sm font-medium">Food Menu</span>
        </div>
      </Button>

      <Button
        className={`rounded-full h-10 transition-colors ${
          isOrdersPage ? "bg-black text-white" : "bg-white text-black"
        }`}
        onClick={() => router.push("/admin/orders")}
      >
        <div className="w-full h-full flex items-center px-4 gap-2.5">
          <FiTruck className="size-5" />
          <span className="text-sm font-medium">Orders</span>
        </div>
      </Button>
    </div>
  );
};
