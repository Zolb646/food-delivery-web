"use client";
import { Button } from "@/components/ui/button";
import { Profile } from "../_components/profile";
import { useEffect, useState } from "react";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MDA0NjFlZTJkYjUyMTk3ODM1ZDlmZiIsImVtYWlsIjoiem9sYjY0NkBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NjE2MjU2NTUsImV4cCI6MTc2MjIzMDQ1NX0.lMosgQwpXzQlke1v_mWbVwE0R0vhMExXz-pZ0bLA4kE",
  },
};

export const FoodMenuSection = () => {
  const [categories, setCategories] = useState([]);
  const [food, setFood] = useState([]);

  const getData = async () => {
    try {
      const catRes = await fetch(
        "http://localhost:8000/food-category",
        options
      );
      if (!catRes.ok) throw new Error("Failed to fetch");
      const catJson = await catRes.json();
      const foodRes = await fetch("http://localhost:8000/food", options);
      const foodsByCategory = await Promise.all(
        catJson.map(async (category) => {
          const res = await fetch(
            `http://localhost:8000/food/${category._id}`,
            options
          );
          if (!res.ok) return []; // fallback
          const data = await res.json();
          return { categoryId: category._id, items: data };
        })
      );
      if (!foodRes.ok) throw new Error("Failed to fetch");
      const foodJson = await foodRes.json();
      setCategories(catJson || []);
      setFood({ all: foodJson || [], byCategory: foodsByCategory || [] });

      console.log("Fetched menus:", catJson);
      console.log("Fetched foods:", foodJson);
      console.log("Foods by category:", foodsByCategory);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="w-[80%] mt-6 flex flex-col">
      <div className="w-full h-fit flex items-end flex-col justify-between">
        <Profile />
        <div className="flex flex-col w-full rounded-xl bg-white border-2 border-[#e4e4e7] justify-between mt-6 p-6 gap-4">
          <span className="font-semibold text-2xl">Dishes category</span>
          <div className="w-full h-fit flex flex-wrap gap-4">
            {" "}
            <Button
              variant="outline"
              className={`rounded-full min-w-35 flex items-center justify-between font-medium`}
            >
              All Dishes
              <div className="w-10 h-full bg-black text-white flex items-center justify-center rounded-full">
                {food.all?.length}
              </div>
            </Button>
            {categories.map((category, index) => (
              <Button
                key={index}
                variant="outline"
                className={`rounded-full min-w-35 flex items-center justify-between font-medium`}
              >
                {category.categoryName}
                <div className="w-10 h-full bg-black text-white flex items-center justify-center rounded-full">
                  {food.byCategory.find((fc) => fc.categoryId === category._id)
                    ?.items.length || 0}
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
