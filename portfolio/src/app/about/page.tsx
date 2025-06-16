"use client";

import React from "react";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";
import MouseScrollIndicator from "@/components/mousescroll";


export default function AboutPage() {
  const poeticIntro = "Hi, I'm Diwakar, a designer and full-stack developer.";
  
  const aboutDetails = `I build responsive scalable web applications that solve real problems and create meaningful digital experiences.`;
  
  return (
    <section className="w-full bg-black text-white py-72  px-6">
      <MouseScrollIndicator/>
      <div className="w-full  mt-40 max-w-[80rem] mx-auto">
        
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-[#111111] rounded-lg border-0  p-4 w-full h-64 inline-block"
          >
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              {/* Left Side - Poetic Intro */}
              <div className="sm:w-1/2 text-white text-xl font-bold">
                <TextGenerateEffect words={poeticIntro} />
              </div>
              
              {/* Right Side - About Details */}
              <div className="sm:w-1/2 text-right">
                <TextGenerateEffect
                  words={aboutDetails}
                  className="text-gray-300 text-sm leading-6"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}