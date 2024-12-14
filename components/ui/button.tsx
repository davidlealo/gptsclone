import React from "react";

export const Button = ({
  children,
  onClick,
  type = "button",
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}) => (
  <button onClick={onClick} type={type} className={`btn ${className}`}>
    {children}
  </button>
);
