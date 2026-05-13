import { motion, type Variants } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  FaGithubSquare,
  FaTwitterSquare,
  FaLinkedin,
  FaFileAlt,
} from "react-icons/fa";

import homegif from "../../images/HomePresentation.webp";

const TYPE_MS = 72;

const GREETING = "Hi! I'm ";
const NAME = "FrigoDev";
const ROLE = "Full-Stack Developer";

const CTA_ZONE_MIN_HEIGHT = "min-h-[280px]";

const ctaOuterVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.32,
      delayChildren: 0.08,
    },
  },
};

const ctaRowVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.06,
    },
  },
};

const easeOutSoft = [0.22, 1, 0.36, 1] as const;

const ctaRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.96,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.95,
      ease: easeOutSoft,
    },
  },
};

const AnimatedHome = () => {
  const [greetingPlain, setGreetingPlain] = useState("");
  const [namePart, setNamePart] = useState("");
  const [roleLine, setRoleLine] = useState("");

  useEffect(() => {
    const greeting = GREETING;
    const name = NAME;
    const role = ROLE;

    let phase: 0 | 1 | 2 = 0;
    let i = 0;
    const tick = () => {
      if (phase === 0) {
        i += 1;
        setGreetingPlain(greeting.slice(0, i));
        if (i >= greeting.length) {
          phase = 1;
          i = 0;
        }
      } else if (phase === 1) {
        i += 1;
        setNamePart(name.slice(0, i));
        if (i >= name.length) {
          phase = 2;
          i = 0;
        }
      } else {
        i += 1;
        setRoleLine(role.slice(0, i));
        if (i >= role.length) {
          window.clearInterval(id);
        }
      }
    };

    const id = window.setInterval(tick, TYPE_MS);
    return () => window.clearInterval(id);
  }, []);

  const line1Done =
    greetingPlain.length === GREETING.length && namePart.length === NAME.length;
  const line2Done = roleLine.length === ROLE.length;
  const typingComplete = line2Done;

  return (
    <section
      id="Home"
      className="flex w-full h-screen relative align-center justify-center items-center text-center"
    >
      <div className="w-full h-screen absolute">
        <img src={homegif} alt="" className="w-full h-full absolute object-cover" />
      </div>
      <div className="flex flex-col align-center justify-center text-white items-center font-bold z-10 px-4">
        <div className="text-5xl z-10 w-full max-w-4xl text-center">
          <span className="inline-block min-h-[1.25em]">
            {greetingPlain}
            <span className="text-blue-500">{namePart}</span>
            {!line1Done ? (
              <motion.span
                className="inline-block w-0.5 h-[0.85em] bg-white/90 ml-0.5 align-middle"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.85, repeat: Infinity }}
                aria-hidden
              />
            ) : null}
          </span>
          <br />
          <br />
          <span className="inline-block min-h-[1.25em] text-5xl">
            {roleLine}
            {line1Done && !line2Done ? (
              <motion.span
                className="inline-block w-0.5 h-[0.85em] bg-white/90 ml-0.5 align-middle"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.85, repeat: Infinity }}
                aria-hidden
              />
            ) : null}
          </span>
        </div>
        <div
          className={`mt-8 flex w-full max-w-4xl flex-col items-center justify-start ${CTA_ZONE_MIN_HEIGHT}`}
          aria-hidden={!typingComplete}
        >
          {typingComplete ? (
            <motion.div
              key="hero-cta"
              className="flex w-full flex-col items-center"
              variants={ctaOuterVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={ctaRevealVariants} className="z-10">
                <a
                  href="/CV Alejandro Román v2 Eng Version.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-2 text-sm font-semibold uppercase tracking-wide backdrop-blur-md transition hover:bg-white/20 hover:border-blue-400/80"
                >
                  <FaFileAlt className="text-lg" aria-hidden />
                  Download CV
                </a>
              </motion.div>
              <motion.div
                className="z-10 mt-10 flex flex-wrap justify-center"
                variants={ctaRowVariants}
              >
                <motion.a
                  href="https://twitter.com/FrigoDev"
                  target="_blank"
                  rel="noreferrer"
                  variants={ctaRevealVariants}
                  className="mx-3 sm:mx-4"
                  aria-label="Twitter"
                >
                  <FaTwitterSquare className="text-5xl sm:text-6xl text-white hover:text-blue-400 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110" />
                </motion.a>
                <motion.a
                  href="https://github.com/FrigoDev"
                  target="_blank"
                  rel="noreferrer"
                  variants={ctaRevealVariants}
                  className="mx-3 sm:mx-4"
                  aria-label="GitHub"
                >
                  <FaGithubSquare className="text-5xl sm:text-6xl text-white hover:text-[#c5d1de] transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/frigodev/"
                  target="_blank"
                  rel="noreferrer"
                  variants={ctaRevealVariants}
                  className="mx-3 sm:mx-4"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="text-5xl sm:text-6xl text-white hover:text-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110" />
                </motion.a>
              </motion.div>
            </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default AnimatedHome;
