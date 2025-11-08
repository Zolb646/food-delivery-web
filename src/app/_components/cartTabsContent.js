import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { FiX } from "react-icons/fi";
import { QuantitySelector } from "./quantitySelector";
import { PriceNumber } from "./priceNumber";
import { DashedSeparator } from "./separator";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const CartTabsContent = () => {
  return (
    <TabsContent value={`Cart`} className={`mt-6 h-full`}>
      <Card className={`h-[628px] flex-col justify-between px-4`}>
        <CardHeader>
          <CardTitle className={`text-[20px] text-[#71717A]`}>
            My cart
          </CardTitle>
          <div className="w-full max-h-96 mt-5 overflow-y-auto flex flex-col gap-5">
            <div className="w-full h-30 flex gap-2.5">
              <img
                src={`/hero-image.png`}
                className="h-full w-30 object-cover rounded-xl shadow-xl"
              />
              <div className="h-full w-full flex flex-col gap-6">
                <div className="w-full h-15 flex gap-2.5">
                  <div className="w-full h-fit">
                    <h1 className="font-bold text-base text-red-500">
                      tsuivan
                    </h1>
                    <p className="text-xs">afaf, fawfaf, fawfwaf, fawfw</p>
                  </div>
                  <Button
                    variant={`outline`}
                    className={`rounded-full border border-red-500`}
                    size={`icon`}
                  >
                    <FiX className="text-red-500" />
                  </Button>
                </div>
                <div className="w-full h-9 flex justify-between">
                  <QuantitySelector />
                  <PriceNumber num={`12.99`} size={`lg`} />
                </div>
              </div>
            </div>
            <DashedSeparator />
            <div className="w-full h-30 flex gap-2.5">
              <img
                src={`/hero-image.png`}
                className="h-full w-30 object-cover rounded-xl shadow-xl"
              />
              <div className="h-full w-full flex flex-col gap-6">
                <div className="w-full h-15 flex gap-2.5">
                  <div className="w-full h-fit">
                    <h1 className="font-bold text-base text-red-500">
                      tsuivan
                    </h1>
                    <p className="text-xs">afaf, fawfaf, fawfwaf, fawfw</p>
                  </div>
                  <Button
                    variant={`outline`}
                    className={`rounded-full border border-red-500`}
                    size={`icon`}
                  >
                    <FiX className="text-red-500" />
                  </Button>
                </div>
                <div className="w-full h-9 flex justify-between">
                  <QuantitySelector />
                  <PriceNumber num={`12.99`} size={`lg`} />
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardFooter>
          <div className="w-full max-h-28 flex flex-col gap-2">
            <Label
              htmlFor={`delivery-location`}
              className={`text-[20px] text-[#71717A]`}
            >
              Delivery location
            </Label>
            <Textarea
              id={`delivery-location`}
              placeholder={`Please share your complete address`}
            />
          </div>
        </CardFooter>
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
