"use client";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { getOptions } from "../admin/utils/getOptions";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export const CategoryScroller = ({ onCategorySelect, selectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const [scrollPos, setScrollPos] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const options = getOptions();
        const res = await fetch("http://localhost:8000/food-category", options);
        if (!res.ok) throw new Error("Failed to fetch categories");
        const json = await res.json();
        setCategories(json);
      } catch (err) {
        console.log(err);
      }
    };
    getCategories();
  }, []);

  const handleScroll = (e) => {
    const el = e.target;
    setScrollPos(el.scrollLeft);
    setMaxScroll(el.scrollWidth - el.clientWidth);
  };

  const scrollLeft = (e) => {
    const el = e.target.nextSibling;
    el.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = (e) => {
    const el = e.target.previousSibling;
    el.scrollBy({ left: 200, behavior: "smooth" });
  };

  const showLeft = scrollPos > 10;
  const showRight = scrollPos < maxScroll - 10;

  useEffect(() => {
    const handleClickOutside = () => setCategoryId(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="w-full h-fit flex flex-col gap-9 pb-8 pt-4 px-12 bg-[#404040] sticky top-5 z-20">
      <h1 className="font-bold text-3xl px-10 text-white">Categories</h1>
      <div className="relative flex items-center">
        {showLeft && (
          <button onClick={scrollLeft} className="absolute left-0 z-10">
            <FiChevronLeft className="text-2xl text-white hover:text-blue-300" />
          </button>
        )}

        <div
          className="w-full flex gap-2 overflow-x-auto scroll-smooth mx-10 no-scrollbar"
          onScroll={handleScroll}
        >
          {categories.map((category) => (
            <Badge
              key={category._id}
              variant="secondary"
              className={`text-lg font-normal px-5 py-1 shrink-0 cursor-pointer ${
                categoryId === category._id ? "bg-red-500 text-white" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onCategorySelect?.(category);
                setCategoryId?.(category._id);
              }}
            >
              {category.categoryName}
            </Badge>
          ))}
        </div>

        {showRight && (
          <button onClick={scrollRight} className="absolute right-0 z-10">
            <FiChevronRight className="text-2xl text-white hover:text-blue-300" />
          </button>
        )}
      </div>
    </div>
  );
};
