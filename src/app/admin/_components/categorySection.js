"use client";
import { FoodCard } from "./foodCard";
import { useState } from "react";
import { checkIfInputHasSpecialCharacters } from "../utils/validation";
import { AddFoodModal } from "./addFoodModal";
import { createOptions } from "../utils/createOptions";

export const CategorySection = ({
  category,
  foods = [],
  setErrorState,
  errorState,
  getData,
  categories,
}) => {
  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState(0);
  const [ingredientsText, setIngredientsText] = useState("");
  const [image, setImage] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const validateErrors = () => {
    const errors = {};
    if (
      !foodName ||
      !foodName.trim() ||
      foodName.length < 3 ||
      foodName.length > 50 ||
      foodName.startsWith(" ") ||
      foodName.endsWith(" ") ||
      checkIfInputHasSpecialCharacters(foodName)
    ) {
      errors.foodName = "Invalid food name";
    }
    if (!price || !Number.isFinite(price) || price <= 0) {
      errors.price = "Invalid price";
    }
    if (!ingredientsText) {
      errors.ingredients = "Invalid ingredients";
    }
    if (!image) {
      errors.image = "Image is required";
    }
    setErrorState(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddFood = async () => {
    const arr = ingredientsText
      .split(", ")
      .map((s) => s.trim())
      .filter(Boolean);
    try {
      const options = createOptions();
      if (!validateErrors()) return;
      console.log("Food added successfully");
      await fetch("http://localhost:8000/food", {
        ...options,
        body: JSON.stringify({
          foodName: foodName,
          price: price,
          ingredients: arr,
          category: category._id,
          imageUrl: image.name,
        }),
      });
      console.log(
        "Food added successfully",
        foodName,
        price,
        ingredientsText,
        category._id,
        arr,
        image
      );
      await getData();
      setErrorState({});
      setFoodName("");
      setPrice(0);
      setIngredientsText("");
      setImage(null);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error adding food:", error);
    }
  };
  return (
    <>
      <div className="flex flex-col w-full rounded-xl bg-white border-2 border-[#e4e4e7] p-6 gap-4">
        <div className="flex items-center mb-4 font-semibold text-xl gap-2">
          <h2 className="font-semibold text-xl">{category.categoryName}</h2>
          <span>({foods?.length || 0})</span>
        </div>

        <div className="flex gap-4 flex-wrap">
          <AddFoodModal
            setErrorState={setErrorState}
            handleAddFood={handleAddFood}
            setFoodName={setFoodName}
            setPrice={setPrice}
            setIngredientsText={setIngredientsText}
            image={image}
            setImage={setImage}
            errorState={errorState}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            category={category}
            ingredientsText={ingredientsText}
          />

          {Array.isArray(foods) && foods.length > 0 ? (
            foods.map((item) => (
              <FoodCard
                key={item._id}
                item={item}
                categories={categories}
                errorState={errorState}
                image={image}
                setImage={setImage}
                getData={getData}
              />
            ))
          ) : (
            <div className="flex items-center justify-center text-gray-400 italic min-w-60">
              No dishes yet
            </div>
          )}
        </div>
      </div>
    </>
  );
};
