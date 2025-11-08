"use client";
import { PriceNumber } from "./priceNumber";
import { HiPlusSm } from "react-icons/hi";

export const FoodCard = ({ item }) => {
  console.log(item);
  return (
    <div className="w-sm h-78 border border-gray-200 rounded-[20px] shadow-sm bg-white hover:shadow-md transition relative overflow-hidden p-4 flex flex-col gap-5">
      <div className="w-full h-[65%] relative">
        <img
          src={`http://localhost:8000${item.imageUrl}`}
          alt={item.foodName}
          className="object-cover w-full h-full rounded-xl"
        />
        <button className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100">
          <HiPlusSm className="text-red-600 text-xl" />
        </button>
      </div>

      <div className="flex flex-col justify-between h-fit gap-2">
        <div className="flex justify-between gap-2 items-center">
          <p className="font-semibold text-2xl text-red-600">{item.foodName}</p>
          <PriceNumber num={item.price} />
        </div>
        <p className="text-sm font-medium flex flex-wrap">
          {Array.isArray(item.ingredients) && item.ingredients.length > 0
            ? item.ingredients.join(", ")
            : "No ingredients listed"}
        </p>
      </div>
    </div>
  );
};
