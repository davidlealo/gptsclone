import React from "react";

export const Input = ({
  type = "text",
  value,
  onChange,
  placeholder,
  id,
  className,
}: {
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  id?: string;
  className?: string;
}) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    id={id}
    className={`input ${className}`}
  />
);
