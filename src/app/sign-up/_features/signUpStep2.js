import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaChevronLeft } from "react-icons/fa6";

export const SignUpStep2 = ({
  error,
  handleBackStep,
  handleSignup,
  setPassword,
  setConfirmPassword,
  handleClick,
}) => {
  return (
    <div className="w-full h-screen flex items-center justify-center gap-20 pl-40">
      <div className="flex flex-col w-sm h-fit">
        <Button
          variant={`outline`}
          className="w-9 mb-4"
          onClick={handleBackStep}
        >
          <FaChevronLeft className="size-4" />
        </Button>
        <h1 className="text-2xl font-semibold">Create a strong password</h1>
        <p className="text-[#71717A] font-medium mb-6">
          Create a strong password with letters, numbers.
        </p>
        <Input
          placeholder="Enter password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
        {error.password && (
          <p className="text-red-500 mt-4">{error.password}</p>
        )}
        <Input
          placeholder="Confirm password"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={`mt-4`}
        />{" "}
        {error.confirmPassword && (
          <p className="text-red-500 mt-4">{error.password}</p>
        )}
        <Button type="button" className={`w-full mt-6 `} onClick={handleSignup}>
          {"let's Get Started"}
        </Button>
        <div className="w-full flex justify-center items-center mt-6 gap-2 text-[#71717A]">
          <span className="text-base">Already have an account?</span>
          <Button
            variant={`link`}
            className="p-0 m-0 text-base text-[#2563EB] h-fit"
            onClick={handleClick}
          >
            Log in
          </Button>
        </div>
      </div>
      <div className="h-[96%] w-2/3 rounded-2xl">
        <img
          src="/login-signup-Image.png"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
    </div>
  );
};
