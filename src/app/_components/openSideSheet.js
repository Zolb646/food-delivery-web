"use client";
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
import { useEffect, useState } from "react";
import { CartEmpty } from "./cartEmpty";
import { getOptions } from "../admin/utils/getOptions";
import { OrdersTabEmpty } from "./ordersTabEmpty";

export const OpenSideSheet = ({ cart, removeFromCart, setCart, id }) => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const getOrders = async () => {
    try {
      const options = getOptions();
      const res = await fetch(
        `http://localhost:8000/food-order/${id}`,
        options
      );
      const json = await res.json();
      setOrders(json.orders || []);
      console.log(json, "this is orders by id");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={`secondary`} size={`icon`} className={`rounded-full`}>
          <ShoppingCart className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent
        className={`rounded-l-3xl bg-[#404040] w-lg p-8 z-50`}
        aria-describedby={""}
      >
        <SheetHeader className={`p-0`}>
          <SheetTitle className={`flex items-center gap-3 text-white`}>
            <ShoppingCart className="size-6" />
            <span className="font-semibold text-[20px]">Order detail</span>
          </SheetTitle>
        </SheetHeader>
        <Tabs defualtvalue={`Cart`} className={`mt-3 h-full`}>
          <TabsList className={`w-full rounded-full`}>
            <TabsTrigger className={`rounded-full`} value={`Cart`}>
              Cart
            </TabsTrigger>
            <TabsTrigger className={`rounded-full`} value={`Order`}>
              Order
            </TabsTrigger>
          </TabsList>
          {cart.length === 0 ? (
            <CartEmpty cart={cart} />
          ) : (
            <CartTabsContent
              cart={cart}
              removeFromCart={removeFromCart}
              setCart={setCart}
              id={id}
              getOrders={getOrders}
            />
          )}

          {orders.length === 0 ? (
            <OrdersTabEmpty cart={cart} />
          ) : (
            <OrdersTabsContent orders={orders} />
          )}
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};
