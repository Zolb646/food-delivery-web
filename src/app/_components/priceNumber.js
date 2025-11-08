export const PriceNumber = ({ num, size, className }) => {
  return <h1 className={`font-bold text-${size} ${className}`}>{num}MNT</h1>;
};
