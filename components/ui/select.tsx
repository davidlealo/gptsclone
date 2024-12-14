import React, { useState } from "react";

export const Select = ({
  options,
  onChange,
  value,
}: {
  options: string[];
  onChange: (value: string) => void;
  value?: string;
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="select-class"
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export const SelectItem = ({ children }: { children: React.ReactNode }) => (
  <option>{children}</option>
);

export const SelectTrigger = ({
  children,
}: {
  children: React.ReactNode;
}) => <div className="select-trigger">{children}</div>;

export const SelectContent = ({ children }: { children: React.ReactNode }) => (
  <div className="select-content">{children}</div>
);

export const SelectValue = ({
  children,
}: {
  children: React.ReactNode;
}) => <div className="select-value">{children}</div>;
