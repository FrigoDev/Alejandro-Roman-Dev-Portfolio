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
      className="flex justify-center items-center my-2 w-1/4 rounded-2xl aspect-square card-bg cursor-pointer"
    >
      <GatsbyImage image={image} alt={name} className="w-1/2" />
    </motion.div>
  );
};
export default MiniCards;
