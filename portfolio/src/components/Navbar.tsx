"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";

const navItems = [
  { name: "ABOUT", href: "/about" },
  { name: "WORK", href: "/work" },
  { name: "TECH", href: "/tech" },
  { name: "WORKS", href: "/works" },
  { name: "CONTACT", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        window.history.pushState({}, "", href);
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full fixed top-0 right-10 z-30 bg-black/30 backdrop-blur-lg px-4 py-2"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="relative group">
          <Link href="/">
            <div className="w-14 h-14 -ml-10  bg-stone-900 rounded-md flex items-center justify-center overflow-hidden cursor-pointer transition-all duration-300 group-hover:brightness-125">
              <img
                src="/assets/Image.jpeg"
                alt="Diwakar"
                className="w-10 h-10 rounded-full object-cover transition-all duration-300 group-hover:brightness-125"
              />
            </div>
          </Link>

          <a
            href="/works"
            onClick={(e) => handleClick(e, "/works")}
            className="absolute left-[11px] top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-50 outline-none focus:outline-none ring-0"
          >
            <div className="bg-stone-900 border border-white/20 rounded-md shadow-lg px-4 py-3 w-24 h-14 ">
              <p className="text-white mt-1 hover:text-pink-200 text-sm font-medium transition-all duration-300 outline-none">
                Projects
              </p>
            </div>
          </a>
        </div>

        {/* Navigation Links */}
        <div className="absolute flex gap-6 right-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "text-gray-300  line-through decoration-orange-600 decoration-1 underline-offset-2"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
