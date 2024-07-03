import { motion } from "framer-motion";
import * as React from "react";

import SoftwareGif from "../../images/Softwaregif.webp";
import { AllContentfulTechnologiesEdge } from "../../types/home";
import { showAnimation } from "../../utils/animations";
import MiniCards from "../MiniCards";

const Skills = ({ data }: { data: AllContentfulTechnologiesEdge[] }) => {
  return (
    <div className="flex flex-col">
      <motion.div className="mx-auto">
        <motion.p
          viewport={{ once: true, amount: 0.8 }}
          initial="offscreen"
          whileInView="onscreen"
          variants={showAnimation}
          className="font-semibold text-center"
        >
          I’m a frontend developer that loves build beautiful and functional
          websites and web apps using javascript technologies like React,
          NextJS, Gatsby, etc.
        </motion.p>
        <div className="mt-5">
          <motion.img
            viewport={{ once: true, amount: 0.8 }}
            initial="offscreen"
            whileInView="onscreen"
            variants={showAnimation}
            src={SoftwareGif}
            alt="Software developer gif"
            className="rounded-full mx-auto"
          />
        </div>
      </motion.div>
      <div className="text-center mx-auto">
        <motion.h3
          viewport={{ once: true, amount: 0.8 }}
          initial="offscreen"
          whileInView="onscreen"
          variants={showAnimation}
          className="text-blue-500 text-2xl font-semibold mt-14 mb-7"
        >
          MY DEVELOPMENT STACK
        </motion.h3>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3 justify-center mx-4">
          {data.map((edge) => {
            const { node } = edge;
            return (
              <MiniCards
                key={node.name}
                name={node.name}
                image={node.image.gatsbyImageData}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Skills;
