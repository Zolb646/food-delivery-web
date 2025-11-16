import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { User } from "lucide-react";
import { AuthDialogContent } from "./authDialogContent";

export const AuthDialog = ({ isOpen, setIsOpen, router, authTitle }) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={isOpen ? `destructive` : `secondary`}
          size={`icon`}
          className={`rounded-full`}
        >
          <User className="size-4" />
        </Button>
      </DialogTrigger>
      <AuthDialogContent authTitle={authTitle} router={router} />
    </Dialog>
  );
};
