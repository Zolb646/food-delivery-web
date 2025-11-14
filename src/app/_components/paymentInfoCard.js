"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { PriceNumber } from "./priceNumber";
import { DashedSeparator } from "./separator";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const PaymentInfoCard = ({
  subTotal,
  shipping,
  total,
  cart,
  onClick,
  setOpen,
  open,
  setCart,
}) => {
  return (
    <Card className="h-[30%] mt-7 px-4">
      <CardHeader>
        <CardTitle className="text-[20px] text-[#71717A]">
          Payment Info
        </CardTitle>
      </CardHeader>

      <div className="w-full h-[23.2%]">
        <div className="w-full h-[49.5%] flex justify-between items-center">
          <p className="text-[#71717A]">Items</p>
          <PriceNumber num={subTotal} size="lg" />
        </div>
        <div className="w-full h-[49.5%] flex justify-between items-center">
          <p className="text-[#71717A]">Shipping</p>
          <PriceNumber num={shipping} size="lg" />
        </div>
      </div>

      <DashedSeparator />

      <div className="w-full flex justify-between items-center">
        <p className="text-[#71717A]">Total</p>
        <PriceNumber num={total} size="lg" />
      </div>

      <Button
        className="rounded-full"
        variant="destructive"
        onClick={onClick}
        disabled={!cart.length}
      >
        Checkout
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          className="flex items-center flex-col gap-3 z-50"
          aria-describedby=""
        >
          <DialogHeader>
            <DialogTitle>Your order has been successfully placed!</DialogTitle>
          </DialogHeader>
          <img src="/illustration.png" alt="Order illustration" />
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="secondary"
                className="rounded-full"
                onClick={() => {
                  setOpen(false);
                  setCart([]);
                }}
              >
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
