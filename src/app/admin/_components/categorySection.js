"use client";
import { FoodCard } from "./foodCard";
import { useState } from "react";
import { AddFoodModal } from "./addFoodModal";
import { createOptions } from "../utils/createOptions";

const UPLOAD_PRESET = "swift delivery";
const CLOUD_NAME = "drnymjaan";

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
  const [imageUrl, setImageUrl] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const validateErrors = () => {
    const errors = {};
    if (
      !foodName ||
      !foodName.trim() ||
      foodName.length < 3 ||
      foodName.length > 50 ||
      foodName.startsWith(" ") ||
      foodName.endsWith(" ")
    ) {
      errors.foodName = "Invalid food name";
    }
    if (!price || !Number.isFinite(price) || price <= 0) {
      errors.price = "Invalid price";
    }
    if (!ingredientsText) {
      errors.ingredients = "Invalid ingredients";
    }
    if (!imageUrl) {
      errors.image = "Image is required";
    }
    setErrorState(errors);
    return Object.keys(errors).length === 0;
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setImageUrl(url);
    } catch (err) {
      console.log("Failed to upload logo: " + err.message);
    } finally {
      setUploading(false);
    }
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
          imageUrl: imageUrl,
        }),
      });
      console.log(
        "Food added successfully",
        foodName,
        price,
        ingredientsText,
        category._id,
        arr,
        imageUrl
      );
      await getData();
      setErrorState({});
      setFoodName("");
      setPrice(0);
      setIngredientsText("");
      setImageUrl(null);
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
            errorState={errorState}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            category={category}
            ingredientsText={ingredientsText}
            handleImageUpload={handleImageUpload}
            uploading={uploading}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
          />

          {Array.isArray(foods) && foods.length > 0 ? (
            foods.map((item) => (
              <FoodCard
                key={item._id}
                item={item}
                categories={categories}
                errorState={errorState}
                getData={getData}
                handleImageUpload={handleImageUpload}
                uploading={uploading}
                setUploading={setUploading}
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
