import { motion } from "framer-motion";
import { IGatsbyImageData, GatsbyImage } from "gatsby-plugin-image";
import React from "react";

import { showAnimation, hoverEffect } from "../../utils/animations";
import "./MiniCards.css";

const MiniCards = ({
  image,
  name,
}: {
  image: IGatsbyImageData;
  name: string;
}) => {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      whileHover={hoverEffect}
      variants={showAnimation}
      viewport={{ once: true, amount: 0.8 }}
      className="relative flex justify-center items-center m-2 rounded-2xl aspect-square card-bg cursor-pointer group"
    >
      <GatsbyImage image={image} alt={name} className="w-1/2" />
      <div className="absolute bottom-0 flex-col items-center hidden sm:group-hover:flex">
        <span className="bg-inherit text-white text-base rounded py-1 px-2 mb-1 shadow-md">
          {name.slice(0, -5)}
        </span>
        <div className="w-3 h-3 -mb-1 rotate-45 bg-[#34455d]"></div>
      </div>
    </motion.div>
  );
};

export default MiniCards;