import { motion } from "framer-motion";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React, { useMemo } from "react";
import { FaSearch } from "react-icons/fa";

import useTagFilter from "../../hooks/useTagFilter";
import { AllContentfulProjects } from "../../types/home";
import { showAnimation, hoverEffect } from "../../utils/animations";
import TagFilter from "../tag";

const ProjectsSection = ({
  projectsData,
}: {
  projectsData: AllContentfulProjects;
}) => {
  const { filterTags, filterText, handleDelete, handleFilter } = useTagFilter(
    projectsData.edges
  );
  const projects = useMemo(
    () =>
      filterTags.length !== 0
        ? projectsData.edges.filter(
          (project) =>
            project.node.tags.filter((tag) => filterTags.includes(tag))
              .length === filterTags.length
        )
        : projectsData.edges,
    [filterTags]
  );
  return (
    <div>
      <motion.div
        viewport={{ once: true, amount: 0.8 }}
        initial="offscreen"
        whileInView="onscreen"
        variants={showAnimation}
        className="w-4/5 mx-auto"
      >
        <label className="">Search Technologies</label>
        <div className="relative rounded shadow-sm">
          <input
            value={filterText}
            placeholder="Example: React, Gatsby, CSS, etc..."
            onChange={(e) => handleFilter(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="uname"
            name="name"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
        </div>
        <div className="flex flex-wrap items-baseline mt-4 mb-6 pb-6 border-b border-slate-200 ">
          {filterTags.length !== 0 &&
            filterTags.map((tag) => (
              <TagFilter
                handleDelete={() => {
                  handleDelete(tag);
                }}
                name={tag}
                key={tag}
              />
            ))}
        </div>
      </motion.div>
      <div className="flex flex-wrap justify-center gap-8 px-4">
        {projects.map((project) => {
          return (
            <motion.div
              viewport={{ once: true, amount: 0.8 }}
              initial="offscreen"
              whileInView="onscreen"
              whileHover={hoverEffect}
              variants={showAnimation}
              className="flex flex-col relative justify-between sm:w-1/3 xl:w-1/4  border-2 duration-150"
              key={project.node.id}
            >
              <GatsbyImage
                className="rounded-t-lg"
                image={project.node.image.gatsbyImageData}
                alt={project.node.name}
              />
              <div className="p-2">
                <h3 className="text-blue-500 text-center uppercase font-bold text-base tracking-wide">
                  {project.node.name}
                </h3>
              </div>
              <div className="rounded-b-lg card-bg p-4">
                <p className="text-center">{project.node.tags.join(", ")}</p>
              </div>
              <Link
                className="absolute cursor-pointer w-full h-full"
                to={`/project/${project.node.id}`}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsSection;
