"use client";

import React from "react";
import clsx from "clsx";

interface GradientTextProps {
  children: React.ReactNode;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
  className?: string;
}

const GradientText: React.FC<GradientTextProps> = ({
  children,
  colors = ["#ff6ec4", "#7873f5", "#4ade80"],
  animationSpeed = 4,
  showBorder = false,
  className = "",
}) => {
  const gradientStyle = {
    backgroundImage: `linear-gradient(270deg, ${colors.join(", ")})`,
    backgroundSize: "400% 400%",
    animation: `gradientShift ${animationSpeed}s ease infinite`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  return (
    <span
      className={clsx("relative", showBorder && "border px-2 py-1", className)}
      style={gradientStyle}
    >
      {children}
    </span>
  );
};

export default GradientText;
