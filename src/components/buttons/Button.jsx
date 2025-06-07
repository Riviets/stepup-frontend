import React from "react";

const Button = ({
  type = "button",
  onClick = () => {},
  className,
  children,
  isSubmitting = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${className} ${
        isSubmitting && "bg-gray-400 hover:bg-gray-500 transition duration-300"
      }`}
      disabled={isSubmitting}
    >
      {children}
    </button>
  );
};

export default Button;
