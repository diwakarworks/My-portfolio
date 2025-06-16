"use client";
import React from "react";
import { motion } from "framer-motion";
import {useRouter} from "next/navigation";


export default function MouseScrollIndicator() {
    const router = useRouter();

  const handleClicked = () => {
    router.push("#about"); 
  };
  return (
    <div onClick={handleClicked} className="flex justify-center items-center -mt-80 py-10 relative cursor-pointer">
      <svg
        width="35"
        height="45"
        viewBox="0 0 35 55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-white"
      >
        {/* Mouse Outline */}
        <rect
          x="1.5"
          y="1.5"
          width="32"
          height="52"
          rx="16"
          stroke="white"
          strokeWidth="3"
        />

        {/* Animated Dot inside mouse */}
        <foreignObject x="0" y="0" width="35" height="55">
          <div className="w-full h-full flex justify-center items-start pt-10">
            <motion.div
              className="w-1.5 h-1.5 bg-white rounded-full"
              animate={{
                y: [0, -10, -20,25],
                opacity: [1, 1, ,1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </foreignObject>
      </svg>
    </div>
  );
}
