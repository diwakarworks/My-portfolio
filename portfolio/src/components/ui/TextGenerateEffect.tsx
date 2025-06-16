"use client";


import React, { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();

  const wordsArray = words
    .replace(/\s+/g, " ") // Normalize white space
    .trim()
    .split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration,
        delay: stagger(0.08),
        ease: "easeInOut",
      }
    );
  }, []);

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <motion.div
          ref={scope}
          className="dark:text-white text-white text-4xl leading-snug tracking-wide flex flex-wrap gap-1"
        >
          {wordsArray.map((word, idx) => (
            <motion.span
              key={word + idx}
              className="inline-block opacity-0"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {word}&nbsp;
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
