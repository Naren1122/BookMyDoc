import React from "react";

const Button = ({ children, type = "button", className, ...props }) => {
  return (
    <button
      type={type}
      className={`w-full rounded-md bg-blue-500 text-white py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
