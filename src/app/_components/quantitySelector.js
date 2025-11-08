"use client";
import { FiMinus, FiPlus } from "react-icons/fi";

export function QuantitySelector({ quantity, setQuantity }) {
  //   const increase = () => setQuantity((prev) => prev + 1);
  //   const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="min-w-26 flex items-center gap-3 px-2.5">
      <button
        // onClick={decrease}
        className="text-gray-600 hover:text-red-500 transition"
      >
        <FiMinus size={16} />
      </button>

      <span className="text-lg font-medium w-4 text-center select-none">
        {/* {quantity} */}1
      </span>

      <button
        // onClick={increase}
        className="text-gray-600 hover:text-green-500 transition"
      >
        <FiPlus size={16} />
      </button>
    </div>
  );
}
