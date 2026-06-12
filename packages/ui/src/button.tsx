"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?: "solid" | "outline";
}

export const Button = ({ onClick, children, variant = "solid" }: ButtonProps) => {
  const styles = {
    solid: "text-white bg-gray-800 hover:bg-gray-900 focus:ring-gray-300 border border-transparent",
    outline: "text-gray-800 bg-transparent hover:bg-gray-100 focus:ring-gray-200 border border-gray-800",
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={`${styles[variant]} focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px- py-2 transition-colors duration-150`}
    >
      {children}
    </button>
  );
};