import React, { useState } from "react";

import { AllContentfulProjects } from "../../types/home";
import ProjectCard from "../ProjectCard";

const ProjectsSection = ({
  projectsData,
}: {
  projectsData: AllContentfulProjects;
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleCardToggle = (id: string) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  return (
    <div className="w-full">
      <div className="mt-4 grid grid-cols-1 items-start gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3">
        {projectsData.edges.map((project) => (
          <ProjectCard
            key={project.node.id}
            project={project.node}
            isExpanded={expandedId === project.node.id}
            onToggle={() => handleCardToggle(project.node.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
