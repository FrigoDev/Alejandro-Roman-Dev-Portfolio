import { AnimatePresence, motion } from "framer-motion";
import React, { useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

import useTagFilter from "../../hooks/useTagFilter";
import { AllContentfulProjects } from "../../types/home";
import { showAnimation } from "../../utils/animations";
import ProjectCard from "../ProjectCard";
import TagFilter from "../tag";

const ProjectsSection = ({
  projectsData,
}: {
  projectsData: AllContentfulProjects;
}) => {
  const {
    filterTags,
    availableTags,
    filterText,
    handleDelete,
    handleFilter,
    toggleTag,
    clearFilterText,
  } = useTagFilter(projectsData.edges);

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const projects = useMemo(
    () =>
      filterTags.length !== 0
        ? projectsData.edges.filter(
          (project) =>
            project.node.tags.filter((tag) => filterTags.includes(tag))
              .length === filterTags.length
        )
        : projectsData.edges,
    [filterTags, projectsData.edges]
  );

  const handleCardToggle = (id: string) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  return (
    <div className="w-full">
      <motion.div
        viewport={{ once: true, amount: 0.5 }}
        initial="offscreen"
        whileInView="onscreen"
        variants={showAnimation}
        className="mx-auto w-full max-w-3xl px-4"
      >
        <label
          htmlFor="project-tech-search"
          className="mb-2 block text-xs font-bold uppercase tracking-widest text-blue-500"
        >
          Search Technologies
        </label>

        <div className="relative">
          <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            id="project-tech-search"
            value={filterText}
            placeholder="Example: React, JavaScript, CSS..."
            onChange={(e) => handleFilter(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-11 text-gray-800 placeholder-gray-400 shadow-sm transition-all duration-200 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/30"
            type="text"
            name="project-tech-search"
            autoComplete="off"
          />
          {filterText && (
            <button
              type="button"
              onClick={clearFilterText}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
              aria-label="Clear search"
            >
              <IoMdClose className="text-xl" />
            </button>
          )}
        </div>

        {filterTags.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Active filters
            </span>
            <AnimatePresence mode="popLayout">
              {filterTags.map((tag) => (
                <TagFilter
                  key={tag}
                  name={tag}
                  handleDelete={() => handleDelete(tag)}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        <div className="mt-5 pb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">
            All technologies
          </p>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => {
              const isActive = filterTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "border-blue-500 bg-blue-500 text-white shadow-md shadow-blue-200"
                      : "border-gray-200 bg-white text-gray-600 shadow-sm hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                  aria-pressed={isActive}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      <div className="mt-4 grid grid-cols-1 items-start gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.length === 0 ? (
          <p className="col-span-full py-12 text-center text-gray-400">
            No projects match the selected filters.
          </p>
        ) : (
          projects.map((project) => (
            <ProjectCard
              key={project.node.id}
              project={project.node}
              isExpanded={expandedId === project.node.id}
              onToggle={() => handleCardToggle(project.node.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectsSection;
