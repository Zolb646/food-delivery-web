"use client";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { PriceNumber } from "./priceNumber";
import { DashedSeparator } from "./separator";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CartItem } from "./cartItem";
import { useEffect, useMemo, useState } from "react";
import { createOptions } from "../admin/utils/createOptions";
import { patchOptions } from "../admin/utils/patchOptions";
import { PaymentInfoCard } from "./paymentInfoCard";

export const CartTabsContent = ({
  cart,
  removeFromCart,
  setCart,
  id,
  getOrders,
}) => {
  const [address, setAddress] = useState("");
  const [open, setOpen] = useState(false);
  const [errorState, setErrorState] = useState("");
  const shipping = cart.length > 0 ? 3000 : 0;

  const updateQuantity = (id, newQty) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const subTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);
  const total = subTotal + shipping;

  useEffect(() => {
    if (!id) return;
    const token = localStorage.getItem("token");

    const fetchAddress = async () => {
      try {
        const res = await fetch(`http://localhost:8000/auth/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (!res.ok) throw new Error(`Failed to fetch user: ${res.status}`);

        const data = await res.json();
        setAddress(data.address || "");
      } catch (err) {
        console.error(err);
      }
    };

    fetchAddress();
  }, [id]);

  const patchData = async () => {
    try {
      const options = patchOptions();
      const res = await fetch(`http://localhost:8000/auth/${id}`, {
        ...options,
        body: JSON.stringify({ address }),
      });
      if (!res.ok) throw new Error("Failed to update address");
      const json = await res.json();
      return json;
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckout = async () => {
    if (!address) {
      alert("Please enter your delivery address before checkout.");
      return;
    }
    try {
      await patchData();
      const options = createOptions();
      const res = await fetch("http://localhost:8000/food-order", {
        ...options,
        body: JSON.stringify({
          cart: cart.map((item) => ({
            _id: item._id,
            quantity: item.quantity,
            price: item.price,
          })),
          address,
        }),
      });
      if (!res.ok) throw new Error("Failed to create order");
      const data = await res.json();
      console.log("Order created:", data);
      setOpen(true);
      await getOrders();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <TabsContent value="Cart" className="mt-6 h-full">
        <Card className="h-[628px] flex-col justify-between px-4">
          <CardHeader>
            <CardTitle className="text-[20px] text-[#71717A]">
              My cart
            </CardTitle>
            <div className="w-full max-h-96 mt-5 overflow-y-auto flex flex-col gap-5">
              {cart.map((item, index) => (
                <CartItem
                  key={item._id}
                  index={index}
                  cart={cart}
                  foodName={item.foodName}
                  ingredients={item.ingredients}
                  imageUrl={item.imageUrl}
                  price={item.price}
                  removeFromCart={() => removeFromCart(item._id)}
                  quantity={item.quantity}
                  setQuantity={(newQty) => updateQuantity(item._id, newQty)}
                />
              ))}
            </div>
          </CardHeader>

          <CardFooter>
            <div className="w-full max-h-28 flex flex-col gap-2">
              <Label
                htmlFor="delivery-location"
                className="text-[20px] text-[#71717A]"
              >
                Delivery location
              </Label>
              <Textarea
                id="delivery-location"
                value={address}
                placeholder="Please share your complete address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </CardFooter>
        </Card>

        <PaymentInfoCard
          cart={cart}
          onClick={() => {
            handleCheckout();
          }}
          subTotal={subTotal}
          shipping={shipping}
          total={total}
          open={open}
          setOpen={setOpen}
          setCart={setCart}
        />
      </TabsContent>
    </>
  );
};
