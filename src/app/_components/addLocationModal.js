"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { patchOptions } from "../admin/utils/patchOptions";
import { FiX } from "react-icons/fi";

export const AddLocationModal = ({ id }) => {
  const [address, setAddress] = useState("");
  const [tempAddress, setTempAddress] = useState("");
  const [isOpen, setIsOpen] = useState(false);

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
        console.log(data);
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
        body: JSON.stringify({ address: tempAddress }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      const json = await res.json();
      console.log(json);
      setIsOpen(false);
      setAddress(tempAddress);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={`outline`} className={`rounded-full text-red-500`}>
          <IoLocationOutline className="size-5" />
          {address ? (
            <p className="w-xs truncate">{address}</p>
          ) : (
            <p className="flex gap-2.5">
              Delivery address:
              <span className="text-gray-500">Add Location</span>
            </p>
          )}

          {address ? (
            <div
              onClick={(e) => {
                e.stopPropagation();
                setAddress("");
              }}
            >
              <FiX />
            </div>
          ) : (
            <FaAngleRight className="text-gray-500" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className={`gap-6`} aria-describedby={""}>
        <DialogHeader>
          <DialogTitle>Please write your delivery address!</DialogTitle>
        </DialogHeader>
        <Textarea
          value={tempAddress}
          placeholder={`Please share your complete address`}
          onChange={(e) => setTempAddress(e.target.value)}
        />
        <DialogFooter className={`justify-end pt-6`}>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={patchData}>Deliver Here</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
