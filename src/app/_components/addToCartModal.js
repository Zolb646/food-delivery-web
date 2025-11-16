import { Button } from "@/components/ui/button";
import { FiX } from "react-icons/fi";
import { PriceNumber } from "./priceNumber";
import { QuantitySelector } from "./quantitySelector";

export const AddToCartModal = ({
  setOpenModal,
  item,
  totalPrice,
  quantity,
  setQuantity,
  addToCart,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={() => setOpenModal(false)}
    >
      <div
        className="w-fit h-[420px] bg-white rounded-2xl shadow-lg flex p-6 gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-full w-94">
          <img
            src={item.imageUrl}
            alt={item.foodName}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>

        <div className="h-full w-94 flex flex-col">
          <div className="w-full flex justify-end">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => setOpenModal(false)}
            >
              <FiX />
            </Button>
          </div>

          <div className="w-full flex flex-col justify-between h-full">
            <div className="flex flex-col gap-3">
              <h2 className="text-red-500 text-3xl font-semibold">
                {item.foodName}
              </h2>
              <p className="text-base font-normal">
                {Array.isArray(item.ingredients) && item.ingredients.length > 0
                  ? item.ingredients.join(", ")
                  : "No ingredients listed"}
              </p>
            </div>

            <div className="w-full flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">Total price</p>
                  <h1 className="text-xl font-semibold">
                    <PriceNumber num={totalPrice} />
                  </h1>
                </div>

                <QuantitySelector
                  quantity={quantity}
                  setQuantity={setQuantity}
                  className={`border rounded-full border-black p-2`}
                />
              </div>

              <Button
                className="rounded-full text-base py-5.5"
                onClick={() => {
                  addToCart({ ...item, quantity });
                  setOpenModal(false);
                  setQuantity(1);
                }}
              >
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
