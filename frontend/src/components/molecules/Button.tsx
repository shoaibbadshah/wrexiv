type Props = {
  variant?: "outlined" | "contained";
  children: React.ReactNode;
};

const Button = ({ variant, children }: Props) => {
  // Define base styles
  const baseStyles =
    "rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

  // Variant specific styles
  const variantStyles = {
    outlined:
      "bg-transparent border-2 border-primary-white text-white hover:bg-primary-50 focus-visible:outline-primary-600",
    contained:
      "bg-primary-600 text-white hover:bg-primary-500 focus-visible:outline-primary-600",
  };

  // Combine base styles with variant specific styles
  const className = `${baseStyles} ${variantStyles[variant || "contained"]}`;

  return (
    <button type="submit" className={className}>
      {children}
    </button>
  );
};

export default Button;
