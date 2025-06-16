"use client";
import React, { useEffect, useRef, useState, memo } from "react";
import { motion } from "motion/react";
import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";

export const TextRevealCard = ({
  text,
  revealText,
  children,
  className,
}: {
  text: string;
  revealText: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  const [widthPercentage, setWidthPercentage] = useState(0);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [left, setLeft] = useState(0);
  const [localWidth, setLocalWidth] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Update dimensions on mount and window resize
  useEffect(() => {
    const updateDimensions = () => {
      if (cardRef.current) {
        const { left, width } = cardRef.current.getBoundingClientRect();
        setLeft(left);
        setLocalWidth(width);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  function mouseMoveHandler(event: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    
    const { clientX } = event;
    const { left, width } = cardRef.current.getBoundingClientRect();
    const relativeX = clientX - left;
    const percentage = Math.max(0, Math.min(100, (relativeX / width) * 100));
    setWidthPercentage(percentage);
  }

  function mouseLeaveHandler() {
    setIsMouseOver(false);
    setWidthPercentage(0);
  }

  function mouseEnterHandler() {
    setIsMouseOver(true);
  }

  function touchMoveHandler(event: React.TouchEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    
    const clientX = event.touches[0]?.clientX || 0;
    const { left, width } = cardRef.current.getBoundingClientRect();
    const relativeX = clientX - left;
    const percentage = Math.max(0, Math.min(100, (relativeX / width) * 100));
    setWidthPercentage(percentage);
  }

  const safeWidthPercentage = isNaN(widthPercentage) ? 0 : widthPercentage;
  const rotateDeg = Math.max(-5, Math.min(5, (safeWidthPercentage - 50) * 0.1));
  
  return (
    <div
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      onMouseMove={mouseMoveHandler}
      onTouchStart={mouseEnterHandler}
      onTouchEnd={mouseLeaveHandler}
      onTouchMove={touchMoveHandler}
      ref={cardRef}
      className={cn(
        "bg-[#1d1c20] border border-white/[0.08] w-[63rem] rounded-lg p-8 relative overflow-hidden",
        className
      )}
    >
      {children}

      <div className="h-40 relative flex items-center overflow-hidden">
        {/* Revealed text that follows cursor */}
        <motion.div
          style={{
            width: "100%",
          }}
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{
            clipPath: isMouseOver 
              ? `inset(0 ${Math.max(0, 100 - safeWidthPercentage)}% 0 0)` 
              : "inset(0 100% 0 0)",
          }}
          transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
          className="absolute bg-[#1d1c20] z-20 will-change-transform"
        >
          <p
            style={{
              textShadow: "4px 4px 15px rgba(0,0,0,0.5)",
            }}
            className="text-base sm:text-[3rem] py-10 font-bold text-white bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300"
          >
            {revealText}
          </p>
        </motion.div>

        {/* Line divider that follows cursor */}
        <motion.div
          initial={{ left: "0%", opacity: 0 }}
          animate={{
            left: `${safeWidthPercentage}%`,
            rotate: `${rotateDeg}deg`,
            opacity: isMouseOver ? 1 : 0,
          }}
          transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
          className="h-40 w-[8px] bg-gradient-to-b from-transparent via-neutral-800 to-transparent absolute z-50 will-change-transform"
        />

        {/* Background text */}
        <div className="overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]">
          <p className="text-base lg:text-[3rem] py-10 font-bold bg-clip-text text-transparent bg-[#323238]">
            {text}
          </p>
          <MemoizedStars />
        </div>
      </div>
    </div>
  );
};

export const TextRevealCardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2 className={twMerge("text-white text-lg mb-4", className)}>
      {children}
    </h2>
  );
};

export const TextRevealCardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p className={twMerge("text-[#a9a9a9] text-lg", className)}>{children}</p>
  );
};

const Stars = () => {
  const randomMove = () => Math.random() * 4 - 2;
  const randomOpacity = () => Math.random();
  const random = () => Math.random();
  return (
    <div className="inset-0">
      {[...Array(80)].map((_, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: `calc(${random() * 100}% + ${randomMove()}px)`,
            left: `calc(${random() * 100}% + ${randomMove()}px)`,
            opacity: randomOpacity(),
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: random() * 10 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
            width: `2px`,
            height: `2px`,
            backgroundColor: "white",
            borderRadius: "50%",
            zIndex: 1,
          }}
          className="inline-block"
        />
      ))}
    </div>
  );
};

export const MemoizedStars = memo(Stars);