import { motion } from "framer-motion";
import React from "react";

import homegif from "../../images/HomePresentation.webp";

import "./AnimatedHome.css";

const AnimatedHome = () => {
  const animatedText = {
    hidden: {
      y: "-100%",
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 60,
      },
    },
  };

  return (
    <section
      id="Home"
      className="flex w-full h-screen relative align-center justify-center items-center text-center"
    >
      <div className="w-full h-screen absolute">
        <img src={homegif} alt="HTML-Logo" className="w-full h-full absolute" />
      </div>
      <div className="flex align-center justify-center text-white items-center font-bold">
        <motion.div
          variants={animatedText}
          initial="hidden"
          animate="visible"
          className="text-5xl z-10"
        >
          Hi! I’m
          <span className="text-blue-500"> Alejandro</span>
          <br />
          <br />
          I’m Frontend developer
        </motion.div>
      </div>
    </section>
  );
};
export default AnimatedHome;
