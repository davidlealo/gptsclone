import React from "react";

export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`card ${className}`}>{children}</div>
);

export const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="card-header">{children}</div>
);

export const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="card-title">{children}</h2>
);

export const CardDescription = ({ children }: { children: React.ReactNode }) => (
  <p className="card-description">{children}</p>
);

export const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="card-content">{children}</div>
);
