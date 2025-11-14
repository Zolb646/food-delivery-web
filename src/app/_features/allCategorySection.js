"use client";
import { useEffect, useState } from "react";
import { EachCategory } from "../_components/eachCategory";
import { getOptions } from "../admin/utils/getOptions";

export const AllCategorySection = ({ setCart, cart }) => {
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
      setFood(foodsByCategory || []);
      // console.log(catJson);
      // console.log(foodsByCategory);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const addToCart = (foodItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === foodItem._id);

      if (existing) {
        return prev.map((item) =>
          item._id === foodItem._id
            ? { ...item, quantity: item.quantity + (foodItem.quantity || 1) }
            : item
        );
      }

      return [...prev, { ...foodItem, quantity: foodItem.quantity || 1 }];
    });
  };

  //console.log(cart);
  return (
    <div className="w-full mx-auto flex flex-col gap-12 px-22 pt-4">
      {data.map((cat) => {
        const categoryFoods =
          food.find((fc) => fc.categoryId === cat._id)?.items || [];
        return (
          <div key={cat._id} id={`category-${cat._id}`}>
            <EachCategory
              categoryName={cat.categoryName}
              foods={categoryFoods}
              addToCart={addToCart}
              cart={cart}
            />
          </div>
        );
      })}
    </div>
  );
};
