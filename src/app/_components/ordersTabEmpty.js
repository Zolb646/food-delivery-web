import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { PaymentInfoCard } from "./paymentInfoCard";

export const OrdersTabEmpty = ({ cart }) => {
  return (
    <TabsContent value="Order" className="mt-6 h-full">
      <Card className="h-[628px] flex-col justify-between px-4">
        <CardHeader className={`gap-5`}>
          <CardTitle className="text-[20px] text-[#71717A]">My cart</CardTitle>

          <div className="bg-[#F4F4F5] flex flex-col w-full h-52 rounded-xl items-center justify-center gap-1">
            <img src="favicon.ico" className="size-15" />
            <h1 className="font-bold text-xl">No Orders Yet?</h1>
            <p className="text-center w-xs text-[#71717A] text-sm">
              🍕 &quot;You haven't placed any orders yet. Start exploring our
              menu and satisfy your cravings!&quot;
            </p>
          </div>
        </CardHeader>
      </Card>
      <PaymentInfoCard
        cart={cart}
        shipping={"- "}
        subTotal={"- "}
        total={"- "}
      />
    </TabsContent>
  );
};
