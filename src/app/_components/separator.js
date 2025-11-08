export const DashedSeparator = () => {
  return (
    <div
      className="w-full h-px"
      style={{
        background:
          "repeating-linear-gradient(90deg, #9CA3AF 0px, #9CA3AF 8px, transparent 8px, transparent 16px)",
      }}
    />
  );
};
