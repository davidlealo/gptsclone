import React from "react";

const Textarea = ({
  value,
  onChange,
  placeholder,
}: {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="textarea-class"
    />
  );
};

export default Textarea;
