"use client";

import React from "react";
import { FaGithub, FaXTwitter, FaLinkedin} from "react-icons/fa6";

import { SiLeetcode } from "react-icons/si";


export default function  Footer(){
  return (
    <footer className="w-full py-4 bg-black-100/55 bg-black  text-white flex justify-center gap-6">
      <a
        href="https://github.com/diwakarworks"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithub size={24} />
      </a>
      <a href="https://x.com/LewisDiwakar" target="_blank" rel="noopener noreferrer">
        <FaXTwitter size={24} />
      </a>
      <a
        href="https://www.linkedin.com/in/diwakar-6719b0213"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaLinkedin size={24} />
      </a>
      <a
        href="https://leetcode.com/u/DiwakarG"
        target="_blank"
        rel="noopener noreferrer"
      >
        <SiLeetcode size={24} />
      </a>
    </footer>
  );
};

