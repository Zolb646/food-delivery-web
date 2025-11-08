import { FoodCard } from "./foodCard";

export const EachCategory = ({ categoryName, foods }) => {
  return (
    <div className="w-full flex flex-col gap-12">
      <div className="w-full flex items-center">
        <h1 className="text-3xl font-semibold text-white">{categoryName}</h1>
      </div>
      <div className="w-full flex flex-wrap gap-9">
        {Array.isArray(foods) && foods.length > 0 ? (
          foods.map((item) => <FoodCard key={item._id} item={item} />)
        ) : (
          <div className="flex items-center justify-center text-gray-400 italic min-w-60">
            No dishes yet
          </div>
        )}
      </div>
    </div>
  );
};
