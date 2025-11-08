"use client";
import { useEffect, useState } from "react";
import { EachCategory } from "../_components/eachCategory";
import { getOptions } from "../admin/utils/getOptions";

export const AllCategorySection = () => {
  const [data, setData] = useState([]);
  const [food, setFood] = useState([]);
  const getData = async () => {
    try {
      const options = getOptions();
      const catRes = await fetch(
        "http://localhost:8000/food-category",
        options
      );
      if (!catRes.ok) throw new Error("Failed to fetch categories");
      const catJson = await catRes.json();
      const foodsByCategory = await Promise.all(
        catJson.map(async (category) => {
          const res = await fetch(
            `http://localhost:8000/food/${category._id}`,
            options
          );
          const data = await res.json();
          return { categoryId: category._id, items: data };
        })
      );
      setData(catJson);
      setFood({ byCategory: foodsByCategory || [] });
      console.log(catJson);
      console.log(foodsByCategory);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="w-full mx-auto flex flex-col gap-12 px-22">
      {data.map((cat) => {
        const categoryFoods =
          food.byCategory.find((fc) => fc.categoryId === cat._id)?.items || [];
        return (
          <EachCategory
            key={cat._id}
            categoryName={cat.categoryName}
            foods={categoryFoods}
          />
        );
      })}
    </div>
  );
};
