"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Header } from "./_features/header";
import { FoodCard } from "./_components/foodCard";
import { AllCategorySection } from "./_features/allCategorySection";
import { Footer } from "./_features/footer";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) router.push("/login");
    }
  }, []);
  return (
    <div className="min-h-screen flex w-full flex-col gap-20 bg-[#404040]">
      <div className="flex flex-col w-full">
        <Header />
        <img src={`/hero-image.png`} className="w-full aspect-1440/570" />
      </div>
      <AllCategorySection />
      <Footer />
    </div>
  );
}
