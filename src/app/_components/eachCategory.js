"use client";
import { useState } from "react";
import { FoodCard } from "./foodCard";
import { FiCheck } from "react-icons/fi";

export const EachCategory = ({ categoryName, foods, addToCart, cart }) => {
  const [successMessage, setSuccessMessage] = useState("");
  return (
    <div className="w-full flex flex-col gap-12">
      <div className="w-full flex items-center">
        <h1 className="text-3xl font-semibold text-white">{categoryName}</h1>
      </div>
      <div className="w-full flex flex-wrap gap-9">
        {Array.isArray(foods) && foods.length > 0 ? (
          foods.map((item) => (
            <FoodCard
              key={item._id}
              item={item}
              onClick={() => {
                addToCart(item);
                setSuccessMessage("Food is being added to the cart!");
                setTimeout(() => setSuccessMessage(""), 2500);
              }}
              isInCart={cart.some((c) => c._id === item._id)}
              addToCart={addToCart}
            />
          ))
        ) : (
          <div className="flex items-center justify-center text-gray-400 italic min-w-60">
            No dishes yet
          </div>
        )}
      </div>
      {successMessage && (
        <div className="fixed inset-0 flex h-fit mt-30 justify-center z-50">
          <div className="bg-black text-white flex gap-2.5 px-6 py-3 rounded-sm shadow-lg text-base font-medium animate-fade-in items-center animate-fade-in">
            <FiCheck className="size-5" />
            {successMessage}
          </div>
        </div>
      )}
    </div>
  );
};
