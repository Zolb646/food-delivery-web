import { Button } from "@/components/ui/button";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";

export const AuthDialogContent = ({ authTitle, router }) => {
  return (
    <DialogContent
      className="w-[300px] sm:w-96 bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center"
      aria-describedby=""
    >
      <DialogTitle className={`mb-8`}>{authTitle}</DialogTitle>

      <div className="flex gap-4 w-full justify-center">
        <Button
          variant="outline"
          className="flex-1 rounded-full py-2 px-4 border-gray-300 hover:bg-gray-100"
          onClick={() => router.push("/sign-up")}
        >
          Sign Up
        </Button>
        <Button
          className="flex-1 rounded-full py-2 px-4 text-white"
          onClick={() => router.push("/login")}
        >
          Log In
        </Button>
      </div>
    </DialogContent>
  );
};
