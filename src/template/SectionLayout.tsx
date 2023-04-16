import { motion } from "framer-motion";
import * as React from "react";
import "./SectionLayout.css";

const SectionLayout = ({ name, children }: { name: string, children: React.ReactNode}) => {
  return (
    <section id={name} className="SectionLayout">
      <div className="flex flex-col container mx-auto">
        <div className="my-14">
          <motion.h2 className="text-blue-500 text-center uppercase font-bold text-4xl tracking-wide">
            {name}
          </motion.h2>
          <div className="w-1/5 mx-auto my-2 section-divider"/>
        </div>
        <div>
          {children}
        </div>
      </div>
    </section>
  );
};
export default SectionLayout;
