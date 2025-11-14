"use client";
import { FiMinus, FiPlus } from "react-icons/fi";

export function QuantitySelector({ quantity, setQuantity, className }) {
  const increase = () => setQuantity(quantity + 1);
  const decrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className={`min-w-26 flex items-center justify-center gap-3 px-2.5`}>
      <button
        onClick={decrease}
        className={`text-gray-600 hover:text-red-500 transition disabled:opacity-30 ${className}`}
        disabled={quantity <= 1}
      >
        <FiMinus size={16} />
      </button>

      <span className="text-lg font-medium w-6 text-center select-none">
        {quantity}
      </span>

      <button
        onClick={increase}
        className={`text-gray-600 hover:text-green-500 transition ${className}`}
      >
        <FiPlus size={16} />
      </button>
    </div>
  );
}
