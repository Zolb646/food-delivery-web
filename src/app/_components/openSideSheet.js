import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart } from "lucide-react";
import { CartTabsContent } from "./cartTabsContent";
import { OrdersTabsContent } from "./ordersTabsContent";

export const OpenSideSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={`secondary`} size={`icon`} className={`rounded-full`}>
          <ShoppingCart className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className={`rounded-l-3xl bg-[#404040] w-lg p-8`}>
        <SheetHeader className={`p-0`}>
          <SheetTitle className={`flex items-center gap-3 text-white`}>
            <ShoppingCart className="size-6" />
            <span className="font-semibold text-[20px]">Order detail</span>
          </SheetTitle>
        </SheetHeader>
        <Tabs defualtvalue={`Cart`} className={`mt-3`}>
          <TabsList className={`w-full rounded-full`}>
            <TabsTrigger className={`rounded-full`} value={`Cart`}>
              Cart
            </TabsTrigger>
            <TabsTrigger className={`rounded-full`} value={`Order`}>
              Order
            </TabsTrigger>
          </TabsList>
          <CartTabsContent />
          <OrdersTabsContent />
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};
