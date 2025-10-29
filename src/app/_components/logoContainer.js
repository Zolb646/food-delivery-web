export const LogoContainer = () => {
  return (
    <div className="w-full h-11 flex gap-2.5 items-center">
      <img src="favicon.ico" className="size-10" />
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold">NomNom</h1>
        <p className="text-sm text-gray-500">Swift delivery</p>
      </div>
    </div>
  );
};
