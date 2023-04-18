import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

import "./SectionLayout.css";
import { showAnimation } from "../utils/animations";

const SectionLayout = ({
  name,
  type,
  children,
}: {
  name: string;
  type: string;
  children: React.ReactNode;
}) => {
  const [myClass, setMyClass] = useState("");

  useEffect(() => {
    type === "dark" ? setMyClass("section-dark") : setMyClass("");
  });

  return (
    <section id={name} className={myClass + " pb-14"}>
      <div className="flex flex-col container mx-auto">
        <div className="my-14">
          <motion.h2
            viewport={{ once: true, amount: 0.8 }}
            initial="offscreen"
            whileInView="onscreen"
            variants={showAnimation}
            className="text-blue-500 text-center uppercase font-extrabold text-4xl tracking-wide"
          >
            {name}
          </motion.h2>
          <motion.div
            viewport={{ once: true, amount: 0.8 }}
            initial="offscreen"
            whileInView="onscreen"
            variants={showAnimation}
            className="w-1/5 mx-auto my-2 section-divider"
          />
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
};
export default SectionLayout;
