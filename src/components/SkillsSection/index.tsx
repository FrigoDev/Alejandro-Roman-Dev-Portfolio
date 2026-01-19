import { motion } from "framer-motion";
import * as React from "react";

import SoftwareGif from "../../images/Softwaregif.webp";
import { AllContentfulTechnologiesEdge } from "../../types/home";
import { showAnimation } from "../../utils/animations";
import MiniCards from "../MiniCards";

const Skills = ({ data }: { data: AllContentfulTechnologiesEdge[] }) => {
  return (
    <div className="flex flex-col">
      <motion.div className="flex justify-between md:flex-row flex-col mx-auto px-4">
        <motion.p
          viewport={{ once: true, amount: 0.8 }}
          initial="offscreen"
          whileInView="onscreen"
          variants={showAnimation}
          className="font-semibold text-center md:w-1/2 m-auto px-10"
        >
          I am a dedicated frontend developer and systems engineering student at the Universidad De Cartagena, passionate about creating stunning and highly functional websites and web applications. Utilizing advanced JavaScript technologies such as React, Next.js, and AstroJS, I aim to deliver seamless and visually stunning user experiences that prioritize performance and usability.
        </motion.p>
        <div className="mt-5 md:w-1/2">
          <motion.img
            viewport={{ once: true, amount: 0.8 }}
            initial="offscreen"
            whileInView="onscreen"
            variants={showAnimation}
            src={SoftwareGif}
            alt="Software developer gif"
            className="rounded-full mx-auto"
            width={360}
            height={270}
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
          {data.map((edge, index) => {
            const { node } = edge;
            const isLast = index === data.length - 1;
            return (
              <MiniCards
                key={node.name}
                name={node.name}
                image={node.image.gatsbyImageData}
                className={isLast ? "hidden md:flex" : ""}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Skills;
