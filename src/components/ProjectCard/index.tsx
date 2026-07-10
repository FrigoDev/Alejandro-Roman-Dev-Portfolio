import { AnimatePresence, motion } from "framer-motion";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import { HiExternalLink } from "react-icons/hi";
import { IoChevronDown } from "react-icons/io5";

import { PurpleNode } from "../../types/home";

interface ProjectCardProps {
  project: PurpleNode;
  isExpanded: boolean;
  onToggle: () => void;
}

function TagBadge({ tag }: { tag: string }) {
  return (
    <span className="shrink-0 rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white/90 backdrop-blur-sm">
      {tag}
    </span>
  );
}

const ProjectCard = ({ project, isExpanded, onToggle }: ProjectCardProps) => {
  const description = project.description?.description ?? "";

  return (
    <motion.article
      viewport={{ once: true, amount: 0.2 }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", duration: 0.6, stiffness: 100, damping: 20 }}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900 shadow-lg transition-shadow duration-300 hover:shadow-xl hover:shadow-indigo-500/10 ${
        isExpanded ? "ring-2 ring-indigo-500/50" : ""
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="relative w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
        aria-expanded={isExpanded}
        aria-controls={`project-details-${project.id}`}
      >
        <div className="relative w-full overflow-hidden">
          {project.image ? (
            <GatsbyImage
              image={project.image.gatsbyImageData}
              alt={project.name}
              className="h-full w-full transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-48 w-full bg-slate-800" />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute inset-x-0 bottom-0 p-4">
            <h3 className="text-lg font-bold uppercase tracking-wide text-white drop-shadow-md">
              {project.name}
            </h3>
            <div className="themed-scrollbar mt-2 flex gap-1.5 overflow-x-auto pb-1">
              {project.tags.map((tag) => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </div>
          </div>
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm"
          >
            <IoChevronDown className="text-lg" />
          </motion.span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id={`project-details-${project.id}`}
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="space-y-4 border-t border-slate-700/60 px-4 py-4">
              {description ? (
                <p className="text-sm leading-relaxed text-slate-300">
                  {description}
                </p>
              ) : (
                <p className="text-sm italic text-slate-500">
                  No description available.
                </p>
              )}

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-indigo-400/30 bg-indigo-500/15 px-2.5 py-0.5 text-xs font-medium text-indigo-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-100 hover:shadow-lg"
                >
                  View Project
                  <HiExternalLink className="text-base" />
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

export default ProjectCard;
