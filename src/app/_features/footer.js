"use client";
import { Separator } from "@/components/ui/separator";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { LogoContainer } from "../_components/logoContainer";
import { useEffect, useState } from "react";
import { getOptions } from "../admin/utils/getOptions";

export function Footer() {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const options = getOptions();
      const catRes = await fetch(
        "http://localhost:8000/food-category",
        options
      );
      if (!catRes.ok) throw new Error("Failed to fetch categories");
      const catJson = await catRes.json();
      setData(catJson);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <footer className="w-full py-10 bg-[#121212] flex flex-col items-center mt-20">
      <div className="w-full bg-red-600 overflow-x-auto">
        <div className="w-full bg-red-600 overflow-hidden">
          <div className="flex whitespace-nowrap text-white font-semibold text-xl py-3 gap-8 animate-scroll">
            {Array(25)
              .fill("Fresh fast delivered")
              .map((text, i) => (
                <span key={i}>{text}</span>
              ))}
          </div>
        </div>
      </div>

      <div className="text-gray-300 py-10 px-20 w-fit">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-50">
          <LogoContainer
            logo={"/favicon.ico"}
            color={"text-red-600"}
            blackOrWhite={"text-white"}
            className={`flex flex-col items-center w-fit`}
          />

          <div>
            <h3 className="text-[#71717A] font-semibold mb-3">ZolZol</h3>
            <ul className="space-y-2 text-sm text-white">
              <li>Home</li>
              <li>Contact us</li>
              <li>Delivery zone</li>
            </ul>
          </div>

          <div className="min-w-48">
            <h3 className="text-[#71717A] font-semibold mb-3">MENU</h3>
            <ul className="grid grid-cols-2 gap-y-2 text-sm text-white">
              {data.map((cat) => {
                return <li key={cat._id}>{cat.categoryName}</li>;
              })}
            </ul>
          </div>

          <div>
            <h3 className="text-[#71717A] font-semibold mb-3">FOLLOW US</h3>
            <div className="flex gap-4 text-lg">
              <a href="#" className="hover:text-white">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-white">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-6 bg-gray-700" />

        <div className="text-start text-sm text-[#71717A] space-x-12">
          <span>Copyright 2024 © Nomnom LLC</span>
          <span>Privacy policy</span>
          <span>Terms and condition</span>
          <span>Cookie policy</span>
        </div>
      </div>
    </footer>
  );
}
