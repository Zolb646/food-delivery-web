import { Button } from "@/components/ui/button";
import { FiX } from "react-icons/fi";
import { QuantitySelector } from "./quantitySelector";
import { PriceNumber } from "./priceNumber";
import { DashedSeparator } from "./separator";

export const CartItem = ({
  index,
  cart,
  ingredients,
  foodName,
  imageUrl,
  price,
  removeFromCart,
  quantity,
  setQuantity,
}) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="w-full h-30 flex gap-2.5">
        <img
          src={imageUrl}
          className="h-full w-30 object-cover rounded-xl shadow-xl"
        />
        <div className="h-full w-full flex flex-col gap-6">
          <div className="w-full h-15 flex gap-2.5">
            <div className="w-full h-fit">
              <h1 className="font-bold text-base text-red-500">{foodName}</h1>
              <p className="text-xs">
                {" "}
                {Array.isArray(ingredients) && ingredients.length > 0
                  ? ingredients.join(", ")
                  : "No ingredients listed"}
              </p>
            </div>
            <Button
              variant={`outline`}
              className={`rounded-full border border-red-500`}
              size={`icon`}
              onClick={removeFromCart}
            >
              <FiX className="text-red-500" />
            </Button>
          </div>
          <div className="w-full h-9 flex justify-between">
            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
            <PriceNumber num={price * quantity} size={`lg`} />
          </div>
        </div>
      </div>
      {index !== cart.length - 1 && <DashedSeparator />}
    </div>
  );
};
