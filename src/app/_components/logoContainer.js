export const LogoContainer = ({ logo, color, blackOrWhite, className }) => {
  return (
    <div className={`h-11 ${className}`}>
      <img src={logo} className="size-11" />
      <div className="flex flex-col text-center">
        <h1 className={`text-2xl font-extrabold ${blackOrWhite}`}>
          Zol<span className={color}>Zol</span>
        </h1>
        <p className="text-xs text-gray-500">Swift delivery</p>
      </div>
    </div>
  );
};
