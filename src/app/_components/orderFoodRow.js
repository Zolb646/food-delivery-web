import { PiBowlSteam } from "react-icons/pi";

export const OrderFoodRow = ({ foodName, quantity }) => {
  return (
    <div className="flex w-full h-fit justify-between items-center">
      <div className="w-fit h-fit flex gap-2 text-[#71717A]  items-center">
        <PiBowlSteam className="size-4" />
        <p className="font-normal text-sm">{foodName}</p>
      </div>
      <p>x{quantity}</p>
    </div>
  );
};
