import React from "react";

const ScrollArea = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="scroll-area-class" style={{ overflowY: "auto", maxHeight: "300px" }}>
      {children}
    </div>
  );
};

export default ScrollArea;
