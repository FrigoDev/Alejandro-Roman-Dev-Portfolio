import { motion, useScroll, useSpring } from "framer-motion";
import * as React from "react";
import "./ProgressBar.css";

const ProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return <motion.main style={{ scaleX }} className="progressBar" />;
};
export default ProgressBar;
