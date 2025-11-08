"use client";
import { patchOptions } from "../utils/patchOptions";
import { useState } from "react";
import { deleteOptions } from "../utils/deleteOptions";
import { EditFoodModal } from "./editFoodModal";

export const FoodCard = ({ item, categories, getData }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    foodName: item.foodName || "",
    category: item.category?._id || "",
    categoryName: item.category?.categoryName || "",
    ingredients: Array.isArray(item.ingredients)
      ? item.ingredients.join(", ")
      : item.ingredients || "",
    price: item.price || "",
    imageUrl: item.imageUrl || "",
    previewUrl: item.imageUrl ? `http://localhost:8000${item.imageUrl}` : "",
  });

  const patchData = async (uptadedBody) => {
    try {
      const options = patchOptions();
      const res = await fetch(`http://localhost:8000/food/${item._id}`, {
        ...options,
        body: JSON.stringify(uptadedBody),
      });
      if (!res.ok) throw new Error("Failed to update status");
      const json = await res.json();
      console.log("Uptaded:", json);
      return json;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = async () => {
    const updated = {
      foodName: formData.foodName,
      category: formData.category,
      ingredients: formData.ingredients
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean),
      price: parseFloat(formData.price),
      imageUrl: formData.imageUrl,
      categoryName: formData.categoryName,
    };

    await patchData(updated);
    await getData();
    setOpen(false);
  };

  const deleteData = async () => {
    try {
      const options = deleteOptions();
      const res = await fetch(
        `http://localhost:8000/food/${item._id}`,
        options
      );
      const json = await res.json();
      console.log("deleted:", json);

      await getData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-68 h-60 border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md transition relative overflow-hidden p-4 flex flex-col gap-4">
      <div className="w-full h-[130px] relative">
        <img
          src={`http://localhost:8000${item.imageUrl}`}
          alt={item.foodName}
          className="object-cover w-full h-full rounded-lg"
        />
        <EditFoodModal
          open={open}
          setOpen={setOpen}
          item={item}
          formData={formData}
          setFormData={setFormData}
          categories={categories}
          deleteData={deleteData}
          handleSave={handleSave}
        />
      </div>

      <div className="flex flex-col justify-between h-fit">
        <div className="flex justify-between gap-2">
          <p className="font-semibold text-base text-red-600">
            {item.foodName}
          </p>
          <p className="font-semibold text-sm">{item.price} MNT</p>
        </div>
        <p className="text-xs flex flex-wrap">
          {Array.isArray(item.ingredients) && item.ingredients.length > 0
            ? item.ingredients.join(", ")
            : "No ingredients listed"}
        </p>
      </div>
    </div>
  );
};
