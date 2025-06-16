"use client";

import React from 'react';
import { motion } from 'framer-motion';

// Mock framer-motion for demo purposes
const motion_div = motion.div || 'div';

type Tag = {
  name: string;
  color: string;
};

type Project = {
  name: string;
  description: string;
  tags: Tag[];
  image: string;
  source_code_link: string;
};

const ProjectCard: React.FC<Project & { index: number }> = ({
  name,
  description,
  tags,
  image,
  source_code_link,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{
        y: -10,
        transition: { duration: 0.3 }
      }}
      className="bg-black p-5 rounded-2xl sm:w-[360px] w-full shadow-xl hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="relative bg-black w-full h-[230px] group">
        <img
          src={image || "https://via.placeholder.com/360x230/333/666?text=Project+Image"}
          alt={name}
          className="w-full h-full object-cover object-center rounded-2xl transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute inset-0 flex justify-end m-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open(source_code_link, '_blank')}
            className="bg-gradient-to-r from-gray-700 to-gray-600 w-12 h-12 rounded-full flex justify-center items-center cursor-pointer shadow-lg"
          >
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="mt-5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
      >
        <a
          href="your-link-here"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        ></a>
        <h3 className="text-white font-bold text-[24px] hover:text-blue-400 transition-colors duration-300 ">
          {name}
        </h3>
        <p className="mt-2 text-gray-400 text-[14px] leading-relaxed">
          {description}
        </p>
      </motion.div>

      <motion.div
        className="mt-4 flex flex-wrap gap-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 + 0.4, duration: 0.4 }}
      >
        {tags.map((tag, tagIndex) => (
          <motion.p
            key={`${name}-${tag.name}`}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.5 + tagIndex * 0.05 }}
            whileHover={{ scale: 1.1 }}
            className={`text-[14px] ${tag.color} px-2 py-1 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer`}
          >
            #{tag.name}
          </motion.p>
        ))}
      </motion.div>
    </motion.div>
  );
};

const projects = [
  {
    name: 'NeuroRide',
    description: 'NeuroRide connects riders with drivers instantly using AI-driven matching and route optimization, ensuring faster, safer, and cost-efficient travel.',
    tags: [
      { name: 'Next.js', color: 'text-blue-500' },
      { name: 'FastAPI', color: 'text-green-500' },
      { name: 'GCP', color: 'text-purple-500' },
      { name: 'node', color: 'text-orange-500' },
      { name: 'redis', color: 'text-red-500' },
    ],
    image: '/images/neuro-ride.webp',
    source_code_link: 'https://github.com/diwakarworks/NeuroRide',
  },
  {
    name: 'Cinemate',
    description: 'CineMate helps movie enthusiasts discover, review, and track their favorite films with a sleek and user-friendly interface. Stay updated with the latest releases, explore in-depth reviews, and manage your personal watchlist effortlessly',
    tags: [
      { name: 'react', color: 'text-blue-500' },
      { name: 'node', color: 'text-green-500' },
      { name: 'express', color: 'text-purple-500' },
      { name: 'tailwindcss', color: 'text-orange-500' },
    ],
    image: '/images/cinemate.webp',
    source_code_link: 'https://github.com/diwakarworks/LetterBoxd-Clone',
  },
  {
    name: 'Game Haven',
    description: 'Game Haven is a feature-rich gaming platform that lets users discover, explore, and track their favorite video games. With an immersive UI and advanced filtering, users can find games by genre, platform, and popularity while watching integrated trailers for a complete experience',
    tags: [
      { name: 'redux', color: 'text-pink-500' },
      { name: 'node', color: 'text-red-500' },
      { name: 'react', color: 'text-purple-500' },
      { name: 'mongodb', color: 'text-red-500' },
    ],
    image: '/images/game-haven.webp',
    source_code_link: 'https://github.com/diwakarworks/GameHaven'
  },
  {
    name: 'BookNook',
    description: 'Book Nook is a modern book discovery and reading companion app that lets users explore, organize, and bookmark their favorite reads. It showcases intuitive state management using Context API and a clean, user-friendly interface.',
    tags: [
      { name: 'Context API ', color: 'text-pink-500' },
      { name: 'node', color: 'text-red-500' },
      { name: 'react', color: 'text-purple-500' },
      { name: 'mongodb', color: 'text-red-500' },
    ],
    image: '/images/book-nook.jpg',
    source_code_link: 'https://github.com/diwakarworks/BookNook'
  },
  {
    name: 'MoodBoard',
    description: 'Moodboard is a creative visual journaling app that lets users curate, organize, and express their moods through images and themes. It features clean UI design and efficient state handling.',
    tags: [
      { name: 'tailwind', color: 'text-pink-500' },
      { name: 'node', color: 'text-red-500' },
      { name: 'react', color: 'text-purple-500' },
      { name: 'mongodb', color: 'text-red-500' },
    ],
    image: '/images/moodboard.png',
    source_code_link: 'https://github.com/diwakarworks/MoodBoard'
  },
  {
    name: 'Groovo',
    description: 'Groovo is a sleek and dynamic music streaming platform that allows users to explore tracks, manage playlists, and enjoy a smooth listening experience. ',
    tags: [
      { name: 'Next.js', color: 'text-pink-500' },
      { name: 'Typescript', color: 'text-red-500' },
      { name: 'tailwind', color: 'text-purple-500' },
      { name: 'daisyUI', color: 'text-red-500' },
    ],
    image: '/images/groovo.png',
    source_code_link: 'https://github.com/diwakarworks/SpotifyClone'
  },
];

const Works: React.FC = () => {
  return (
    <div className="min-h-screen-2xl  bg-black py-20">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className='text-white text-center font-bold text-4xl font-sans mb-20'
      >
        LATEST WORK
      </motion.h1>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={`project-${index}`} {...project} index={index} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default Works;