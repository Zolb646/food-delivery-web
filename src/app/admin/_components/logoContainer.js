export const LogoContainer = ({ logo }) => {
  return (
    <div className="w-full h-11 flex gap-2.5 items-center">
      <img src={logo} className="size-10" />
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold">ZolZol</h1>
        <p className="text-sm text-gray-500">Swift delivery</p>
      </div>
    </div>
  );
};
