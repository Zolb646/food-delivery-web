import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { PiBowlSteam } from "react-icons/pi";
import { TbStopwatch } from "react-icons/tb";
import { FiMap } from "react-icons/fi";
import { DashedSeparator } from "./separator";
import { formatDate } from "../admin/utils/formattedDate";
import { OrderFoodRow } from "./orderFoodRow";
import { FormatStatus } from "../admin/utils/formatStatus";

export const OrdersTabsContent = ({ orders }) => {
  console.log(orders);
  return (
    <TabsContent value={`Order`} className={`mt-6 h-full`}>
      <Card className={`h-full flex-col justify-between px-4`}>
        <CardHeader>
          <CardTitle className={`text-[20px] text-[#71717A]`}>
            Orders history
          </CardTitle>

          <div className="h-[878px] w-full flex-col flex overflow-y-auto mt-5 pb-5">
            {orders?.map((order, index) => {
              return (
                <div className="w-full h-fit flex flex-col" key={order._id}>
                  <div className="w-full h-fit flex flex-col px-3 gap-3">
                    <div className="w-full h-fit flex justify-between items-center">
                      <div className="w-fit h-fit flex gap-2.5 font-bold text-lg">
                        <p>{order.totalPrice} MNT</p>
                        <p>({order.orderNumber})</p>
                      </div>
                      <Badge
                        className={`px-3 py-1 font-semibold text-sm ${
                          order.status === "DELIVERED"
                            ? "border-green-500"
                            : order.status === "PENDING"
                            ? "border-red-500"
                            : ""
                        }`}
                        variant={`outline`}
                      >
                        {FormatStatus(order.status)}
                      </Badge>
                    </div>
                    <div className="w-full h-fit flex flex-col gap-2.5">
                      {order.foodOrderItems?.map((dish) => {
                        return (
                          <OrderFoodRow
                            key={dish._id}
                            foodName={dish.food.foodName}
                            quantity={dish.quantity}
                          />
                        );
                      })}
                    </div>
                    <div className="flex w-full h-fit gap-2 text-[#71717A] items-center">
                      <TbStopwatch className="size-4" />
                      <p className="font-normal text-sm">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="w-full h-fit flex gap-2 text-[#71717A] items-center">
                      <FiMap className="size-4" />
                      <p className="text-sm truncate font-normal">
                        {order.user?.address}
                      </p>
                    </div>
                  </div>
                  {index !== orders.length - 1 && (
                    <DashedSeparator className={`my-5`} />
                  )}
                </div>
              );
            })}
          </div>
        </CardHeader>
      </Card>
    </TabsContent>
  );
};
