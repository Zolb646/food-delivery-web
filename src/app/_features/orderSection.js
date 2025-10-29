import { Profile } from "../_components/profile";
import { OrderHeader } from "../_components/orderHeader";
import { OrderTableHeader } from "../_components/orderTableHeader";
import { FaAngleDown } from "react-icons/fa6";
import { RxCaretSort } from "react-icons/rx";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";

export const OrderSection = () => {
  return (
    <div className="w-[80%] mt-10 flex flex-col items-end mb-20 justify-between">
      <Profile />
      <div className="w-full h-[828px] bg-white rounded-lg border-2 border-[#e4e4e7]">
        <OrderHeader />
        <OrderTableHeader />
        <div className="w-full h-[63px] flex items-center justify-between border-b border-[#e4e4e7] 2xl:px-5">
          <input type="checkbox" className="size-4.5 mx-5" />
          <div className="pl-4 pr-6 gap-2.5 text-base">№</div>
          <p className="px-5 font-medium text-[#71717A] w-2xs">Customer</p>
          <div className="px-5 font-medium text-[#71717A] w-43 flex items-center justify-between">
            2 foods <FaAngleDown />
          </div>
          <div className="px-5 flex justify-between items-center w-43 font-medium text-[#71717A]">
            Date
          </div>
          <p className="px-5 w-43 font-medium text-[#71717A]">Total</p>
          <p className="w-2xs px-5 font-medium text-[#71717A]">
            Delivery Address
          </p>
          <div className="w-3xs px-5 flex items-center justify-center">
            <Popover>
              <PopoverTrigger>
                <Button
                  variant="outline"
                  className="flex items-center font-semibold border-red-500 rounded-full px-2.5 py-0.5"
                >
                  Pending
                  <RxCaretSort className="size-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className=" h-fit flex flex-col">
                  <button>Deliveried</button>
                  <button>Pending</button>
                  <button>Cancelled</button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <div className="w-full h-20 flex items-end"></div>
    </div>
  );
};
