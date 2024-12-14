import React, { useState } from "react";

export const Tabs = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="tabs">
      <div className="tabs-list">
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child) && child.type === TabsTrigger) {
            return React.cloneElement(child, {
              isActive: activeTab === index,
              onClick: () => setActiveTab(index),
            });
          }
          return null;
        })}
      </div>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child) && child.type === TabsContent) {
          return activeTab === index ? child : null;
        }
        return null;
      })}
    </div>
  );
};

export const TabsList = ({ children }: { children: React.ReactNode }) => (
  <div className="tabs-list">{children}</div>
);

export const TabsTrigger = ({
  children,
  onClick,
  isActive,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
}) => (
  <button
    className={`tabs-trigger ${isActive ? "active" : ""}`}
    onClick={onClick}
  >
    {children}
  </button>
);

export const TabsContent = ({ children }: { children: React.ReactNode }) => (
  <div className="tabs-content">{children}</div>
);
