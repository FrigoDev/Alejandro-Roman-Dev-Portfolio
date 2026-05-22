import { motion } from "framer-motion";
import { IGatsbyImageData, GatsbyImage } from "gatsby-plugin-image";
import React from "react";

import "./MiniCards.css";

const cardVariants = {
  offscreen: { opacity: 0, y: 16 },
  onscreen: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 20, delay: i * 0.04 },
  }),
};

const MiniCards = ({
  image,
  name,
  className = "",
  index = 0,
}: {
  image: IGatsbyImageData;
  name: string;
  className?: string;
  index?: number;
}) => {
  const displayName = name.slice(0, -5);

  return (
    <motion.div
      custom={index}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.3 }}
      variants={cardVariants}
      whileHover={{ scale: 1.1, transition: { duration: 0.15 } }}
      className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl card-bg cursor-pointer border border-transparent hover:border-blue-500/50 hover:shadow-[0_0_16px_rgba(30,144,255,0.15)] transition-all duration-200 w-24 ${className}`}
    >
      <div className="w-12 h-12 flex items-center justify-center">
        <GatsbyImage
          image={image}
          alt={displayName}
          className="w-full h-full"
          imgClassName="!object-contain"
        />
      </div>
      <span className="text-white/90 text-xs font-semibold text-center leading-tight">
        {displayName}
      </span>
    </motion.div>
  );
};

export default MiniCards;
