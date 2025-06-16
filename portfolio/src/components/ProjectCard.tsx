"use client";

import React from 'react';

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

const ProjectCard: React.FC<Project> = ({
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  return (
    <div className="bg-black p-5 rounded-2xl sm:w-[360px] w-full">
      <div className="relative w-full h-[230px]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-left rounded-2xl"
        />

        <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
          <div
            onClick={() => window.open(source_code_link, '_blank')}
            className="white-gradient w-18 h-18 rounded-none flex justify-center items-center cursor-pointer"
          >
            <img
              src="/icons/github-icon.svg" 
              alt="source code"
              className="w-1/2 h-1/2  ml-10 object-contain"
            />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-white font-bold text-[24px]">{name}</h3>
        <p className="mt-2 text-secondary text-gray-400  text-[14px]">{description}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <p key={`${name}-${tag.name}`} className={`text-[14px] ${tag.color}`}>
            #{tag.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
