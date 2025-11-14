export const DashedSeparator = ({ className }) => {
  return (
    <div
      className={`w-full h-px ${className}`}
      style={{
        background:
          "repeating-linear-gradient(90deg, #9CA3AF 0px, #9CA3AF 8px, transparent 8px, transparent 16px)",
      }}
    />
  );
};
