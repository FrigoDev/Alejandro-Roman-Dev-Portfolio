import { motion } from "framer-motion";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";

import { AllContentfulExperienceEdge } from "../../types/home";
import { showAnimation } from "../../utils/animations";

interface ExperienceSectionProps {
    experiences: AllContentfulExperienceEdge[];
}

const ExperienceSection = ({ experiences }: ExperienceSectionProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto px-4">
      {experiences.map((edge, index) => {
        const { node } = edge;
        const isLast = index === experiences.length - 1;

        return (
          <motion.div
            key={node.id}
            viewport={{ once: true, amount: 0.3 }}
            initial="offscreen"
            whileInView="onscreen"
            variants={showAnimation}
            className="relative flex gap-6"
          >
            {/* Timeline line */}
            {!isLast && (
              <div className="hidden md:block absolute left-6 top-16 bottom-0 w-0.5 bg-blue-500 opacity-30" />
            )}

            {/* Company Logo or Icon */}
            <div className="hidden md:block flex-shrink-0">
              {node.companyLogo ? (
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white border-2 border-blue-500 p-1">
                  <GatsbyImage
                    image={node.companyLogo.gatsbyImageData}
                    alt={node.companyName}
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                  <FaBriefcase className="text-white text-lg" />
                </div>
              )}
            </div>

            {/* Experience Content */}
            <div className="flex-1 pb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                  {node.position}
                </h3>
                <h4 className="text-lg font-semibold text-blue-500 mb-3">
                  {node.companyName}
                </h4>

                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-blue-500" />
                    <span>
                      {formatDate(node.startDate)} -{" "}
                      {node.endDate ? formatDate(node.endDate) : "Present"}
                    </span>
                  </div>
                  {node.location && (
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-blue-500" />
                      <span>{node.location}</span>
                    </div>
                  )}
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  {node.description.description}
                </p>

                {node.technologies && node.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {node.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ExperienceSection;
