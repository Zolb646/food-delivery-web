import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User } from "lucide-react";

export const UserPopover = ({ isOpen, setIsOpen, email, handleSignOut }) => {
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={isOpen ? `destructive` : `secondary`}
          size={`icon`}
          className={`rounded-full`}
        >
          <User className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={`w-46 justify-center items-center gap-2.5 flex flex-col mt-2.5`}
      >
        <h1 className="font-semibold">{email}</h1>
        <Button
          variant={`secondary`}
          size={`sm`}
          className={`rounded-full w-fit`}
          onClick={handleSignOut}
        >
          Sign out
        </Button>
      </PopoverContent>
    </Popover>
  );
};
