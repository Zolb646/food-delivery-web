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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaAngleRight } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";

export const AddLocationModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={`outline`} className={`rounded-full text-red-500`}>
          <IoLocationOutline className="size-5" />
          <p className="flex gap-2.5">
            Delivery address:<span className="text-gray-500">Add Location</span>
          </p>
          <FaAngleRight className="text-gray-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className={`gap-6`}>
        <DialogHeader>
          <DialogTitle>Please write your delivery address!</DialogTitle>
        </DialogHeader>
        <Textarea placeholder={`Please share your complete address`} />
        <DialogFooter className={`justify-end pt-6`}>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Deliver Here</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
