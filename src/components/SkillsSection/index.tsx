import { motion } from "framer-motion";
import * as React from "react";

import { AllContentfulTechnologiesEdge } from "../../types/home";
import { showAnimation } from "../../utils/animations";
import MiniCards from "../MiniCards";

const CATEGORY_ORDER = [
  "Technologies",
  "Frontend",
  "Backend",
  "Databases",
  "Testing",
  "Tools",
  "Design",
  "Other",
];

const getCategoryRank = (category: string) => {
  const index = CATEGORY_ORDER.indexOf(category);
  return index === -1 ? CATEGORY_ORDER.length : index;
};

const Skills = ({ data }: { data: AllContentfulTechnologiesEdge[] }) => {
  const grouped = data.reduce<Record<string, AllContentfulTechnologiesEdge[]>>(
    (acc, edge) => {
      const category = edge.node.category || "Technologies";
      if (!acc[category]) acc[category] = [];
      acc[category].push(edge);
      return acc;
    },
    {}
  );

  const sortedCategories = Object.entries(grouped).sort(
    ([categoryA], [categoryB]) => {
      const rankDifference = getCategoryRank(categoryA) - getCategoryRank(categoryB);
      if (rankDifference !== 0) return rankDifference;

      return categoryA.localeCompare(categoryB);
    }
  );

  return (
    <div className="px-4 max-w-4xl mx-auto w-full">
      {sortedCategories.map(([category, items]) => {
        const sortedItems = [...items].sort((left, right) => {
          const leftName = left.node.name.replace(/-Logo$/i, "");
          const rightName = right.node.name.replace(/-Logo$/i, "");

          return leftName.localeCompare(rightName);
        });

        return (
          <motion.div
            key={category}
            viewport={{ once: true, amount: 0.2 }}
            initial="offscreen"
            whileInView="onscreen"
            variants={showAnimation}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="text-blue-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                {category}
              </span>
              <div className="flex-1 h-px bg-blue-500/20" />
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {sortedItems.map(({ node }, index) => (
                <MiniCards
                  key={node.name}
                  name={node.name}
                  image={node.image.gatsbyImageData}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Skills;
