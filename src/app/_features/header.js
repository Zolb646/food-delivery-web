import { Button } from "@/components/ui/button";
import { AddLocationModal } from "../_components/addLocationModal";
import { LogoContainer } from "../_components/logoContainer";
import { OpenSideSheet } from "../_components/openSideSheet";
import { User } from "lucide-react";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export const Header = () => {
  return (
    <header className={`flex bg-black h-fit w-full px-10 items-center`}>
      <LogoContainer
        logo={"/favicon.ico"}
        color={"text-red-600"}
        blackOrWhite={"text-white"}
        className={`py-10 flex items-center gap-2.5 w-full`}
      />
      <div className="h-full w-fit flex items-center gap-3">
        <AddLocationModal />
        <OpenSideSheet />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={`secondary`}
              size={`icon`}
              className={`rounded-full`}
            >
              <User className="size-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <h1></h1>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};
