import { motion } from "framer-motion";
import React from "react";
import { FaGithubSquare, FaTwitterSquare, FaLinkedin } from "react-icons/fa";

import homegif from "../../images/HomePresentation.webp";

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

  const iconVariants = {
    hidden: { opacity: 0, y: "-100%" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
  };

  return (
    <section
      id="Home"
      className="flex w-full h-screen relative align-center justify-center items-center text-center"
    >
      <div className="w-full h-screen absolute">
        <img src={homegif} alt="HTML-Logo" className="w-full h-full absolute" />
      </div>
      <div className="flex flex-col align-center justify-center text-white items-center font-bold">
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
          I’m a Frontend developer
        </motion.div>
        <div className="flex z-10 mt-10">
          <motion.a
            href="https://twitter.com/FrigoDev"
            target="_blank"
            rel="noreferrer"
            custom={0}
            initial="hidden"
            animate="visible"
            variants={iconVariants}
            className="mx-3 sm:mx-4"
          >
            <FaTwitterSquare className="text-5xl sm:text-6xl text-white hover:text-blue-400 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110" />
          </motion.a>
          <motion.a
            href="https://github.com/FrigoDev"
            target="_blank"
            rel="noreferrer"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={iconVariants}
            className="mx-3 sm:mx-4"
          >
            <FaGithubSquare className="text-5xl sm:text-6xl text-white hover:text-[#c5d1de] transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110" />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/frigodev/"
            target="_blank"
            rel="noreferrer"
            custom={2}
            initial="hidden"
            animate="visible"
            variants={iconVariants}
            className="mx-3 sm:mx-4"
          >
            <FaLinkedin className="text-5xl sm:text-6xl text-white hover:text-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110" />
          </motion.a>
        </div>
      </div>
    </section>
  );
};
export default AnimatedHome;
