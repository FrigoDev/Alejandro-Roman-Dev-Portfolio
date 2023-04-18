import { Variants } from "framer-motion";

export const showAnimation: Variants = {
  offscreen: {
    opacity: 0,
    y: -50,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      duration: 1,
      stiffness: 100,
      damping: 20,
    },
  },
};

export const hoverEffect = {
  scale: 1.05,
  transition: {
    duration: 0.2,
  },
};
