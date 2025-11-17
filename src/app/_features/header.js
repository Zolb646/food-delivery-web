"use client";
import { AddLocationModal } from "../_components/addLocationModal";
import { LogoContainer } from "../_components/logoContainer";
import { OpenSideSheet } from "../_components/openSideSheet";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { UserPopover } from "../_components/userPopover";
import { Button } from "@/components/ui/button";

export const Header = ({ cart, setCart }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      setEmail(decoded.email);
      setId(decoded.id);
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const removeFromCart = (foodId) => {
    localStorage.removeItem("cart");
    setCart((prev) => prev.filter((item) => item._id !== foodId));
  };

  return (
    <header
      className={`flex bg-black h-fit w-full px-22 items-center fixed top-0 z-30`}
    >
      <LogoContainer
        logo={"/favicon.ico"}
        color={"text-red-600"}
        blackOrWhite={"text-white"}
        className={`py-10 flex items-center gap-2.5 w-full`}
      />
      <div className="h-full w-fit flex items-center gap-3">
        <AddLocationModal id={id} />
        <OpenSideSheet
          cart={cart}
          removeFromCart={removeFromCart}
          setCart={setCart}
          id={id}
        />
        {email ? (
          <UserPopover
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            email={email}
            handleSignOut={handleSignOut}
          />
        ) : (
          <Button
            variant={`secondary`}
            className={`rounded-full focus:bg-red-500 focus:text-white`}
            onClick={() => router.push(`login`)}
          >
            Login
          </Button>
        )}
      </div>
    </header>
  );
};
