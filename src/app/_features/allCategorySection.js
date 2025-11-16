"use client";
import { useEffect, useState } from "react";
import { EachCategory } from "../_components/eachCategory";
import { getOptions } from "../admin/utils/getOptions";
import { Loader, Loader2 } from "lucide-react";

export const AllCategorySection = ({ setCart, cart }) => {
  const [data, setData] = useState([]);
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    try {
      setLoading(true);
      const options = getOptions();
      const catRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/food-category`,
        options
      );
      if (!catRes.ok) throw new Error("Failed to fetch categories");
      const catJson = await catRes.json();
      const foodsByCategory = await Promise.all(
        catJson.map(async (category) => {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/food/${category._id}`,
            options
          );
          const data = await res.json();
          return { categoryId: category._id, items: data };
        })
      );
      setData(catJson);
      setFood(foodsByCategory || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
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
      <div className="w-full h-fit flex justify-center">
        {loading && <Loader2 className="h-8 w-8 animate-spin" />}
      </div>
    </div>
  );
};
