export const PriceNumber = ({ num, size, className }) => {
  return (
    <span className={`font-bold text-${size} ${className}`}>{num}MNT</span>
  );
};
