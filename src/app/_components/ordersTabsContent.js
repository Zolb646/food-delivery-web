import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { PriceNumber } from "./priceNumber";
import { DashedSeparator } from "./separator";
import { Button } from "@/components/ui/button";

export const OrdersTabsContent = () => {
  return (
    <TabsContent value={`Order`} className={`mt-6 h-full`}>
      <Card className={`h-[628px] flex-col justify-between px-4`}>
        <CardHeader>
          <CardTitle className={`text-[20px] text-[#71717A]`}>
            Orders history
          </CardTitle>
        </CardHeader>
        <div className="w-full max-h-96 mt-5 overflow-y-auto flex flex-col gap-5">
          agag
        </div>
      </Card>
      <Card className={`h-[30%] mt-7 px-4`}>
        <CardHeader>
          <CardTitle className={`text-[20px] text-[#71717A]`}>
            Payment Info
          </CardTitle>
        </CardHeader>
        <div className="w-full h-[23.2%]">
          <div className="w-full h-[49.5%] flex justify-between items-center">
            <p className="text-[#71717A]">Items</p>
            <PriceNumber num={`12.99`} size={`lg`} />
          </div>
          <div className="w-full h-[49.5%] flex justify-between items-center">
            <p className="text-[#71717A]">Shipping</p>
            <PriceNumber num={`0.99`} size={`lg`} />
          </div>
        </div>
        <DashedSeparator />
        <div className="w-full flex justify-between items-center">
          <p className="text-[#71717A]">Total</p>
          <PriceNumber num={`0.99`} size={`lg`} />
        </div>
        <Button className={`rounded-full`} variant={`destructive`}>
          Checkout
        </Button>
      </Card>
    </TabsContent>
  );
};
