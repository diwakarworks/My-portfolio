"use client";

import React from "react";
import {
  TextRevealCard,
  TextRevealCardTitle,
  TextRevealCardDescription,
} from "@/components/ui/text-reveal-card";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import About from "@/app/about/page";
import Work from "@/app/work/page";
import Tech from "@/app/tech/page";
import Works from "@/app/works/page";
import Contact from "@/app/contact/page";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>

      <section className="min-h-screen bg-black text-white flex items-center justify-center px-4 pt-32">
        <div className="w-full max-w-5xl relative flex flex-col items-center">

          {/* Profile Image Overlapping */}
          <div className="absolute -top-20 z-10">
            <img
              src="/assets/Photo.png"
              alt="Profile"
              className="w-full h-full border-none rounded-full bg-transaprent shadow-lg"
            />
          </div>

          {/* Card */}
          <TextRevealCard text="Diwakar" revealText="Full-Stack Developer">
            <div className="bg-[#1d1c20]  w-full rounded-2xl shadow-lg p-10 pt-24 text-left space-y-6">
              <TextRevealCardTitle className="text-white  text-4xl font-bold">
                I Craft Web Solutions
              </TextRevealCardTitle>
              <TextRevealCardDescription className="text-gray-500 text-lg sm:text-md">
                I turn your ideas into fast elegant and scalable digital products
              </TextRevealCardDescription>

              {/* Buttons */}
            </div>
          </TextRevealCard>
          {/* Buttons */}
          <div className="flex -mt-2 justify-between pt-4 flex-wrap gap-182">
            <Button asChild>
              <a
                href="mailto:diwakarlewis@gmail.com?"
                className="hover:bg-gray-700 cursor-pointer"
              >
                Hire Me
              </a>
            </Button>

            <Button variant="outline" className="text-white border-white text-lg px-6 py-3 rounded-xl">
              <a
                href="/Diwakar_G_B.Tech(IT)2022_7.56CGPA_MERN.pdf"
                download
                className="flex items-center"
              >
                <DownloadIcon className="w-5 h-5 mr-2" />
                <span>Download CV</span>
              </a>
            </Button>
          </div>
        </div>
      </section >

      {/* Other Sections */}
      < section id="about"  > <About /></section >
      <section id="work"><Work /></section>
      <section id="tech" ><Tech /></section>
      <section id="works"><Works /></section>
      <section id="contact"><Contact /></section>

      < Footer />
    </>
  );
}
