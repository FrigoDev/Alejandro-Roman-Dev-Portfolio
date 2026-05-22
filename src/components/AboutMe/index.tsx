import { motion } from "framer-motion";
import * as React from "react";

import SoftwareGif from "../../images/Softwaregif.webp";
import { showAnimation } from "../../utils/animations";

// Update these values to match your actual stats
const STATS = [
  { value: "3+", label: "Years" },
  { value: "15+", label: "Projects" },
  { value: "15+", label: "Technologies" },
];

const AboutMe = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-14 px-4 max-w-5xl mx-auto w-full">

      {/* Text + stats */}
      <motion.div
        viewport={{ once: true, amount: 0.5 }}
        initial="offscreen"
        whileInView="onscreen"
        variants={showAnimation}
        className="flex flex-col gap-6 md:w-1/2 px-2 md:px-0"
      >
        <p className="font-medium text-base leading-relaxed text-center md:text-left opacity-80">
          I am a dedicated frontend developer and Systems Engineer from the
          Universidad De Cartagena, passionate about creating stunning and
          highly functional websites and web applications. Utilizing advanced
          JavaScript technologies such as React, Next.js, and AstroJS, I aim
          to deliver seamless and visually stunning user experiences that
          prioritize performance and usability.
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-y-4 gap-x-6 md:gap-8 mt-2">
          {STATS.map((stat, i) => (
            <React.Fragment key={stat.label}>
              {i > 0 && <div className="hidden sm:block w-px h-8 bg-blue-500/25" />}
              <div className="flex flex-col items-center md:items-start gap-1">
                <span className="text-blue-500 font-extrabold text-2xl md:text-3xl leading-none">
                  {stat.value}
                </span>
                <span className="text-[10px] md:text-xs uppercase tracking-widest opacity-60 font-bold">
                  {stat.label}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </motion.div>

      {/* GIF with glow */}
      <motion.div
        viewport={{ once: true, amount: 0.5 }}
        initial="offscreen"
        whileInView="onscreen"
        variants={showAnimation}
        className="md:w-1/2 flex justify-center"
      >
        <img
          src={SoftwareGif}
          alt="Software developer"
          className="w-full max-w-[260px] md:max-w-[320px] aspect-square object-cover rounded-full ring-4 ring-blue-500/25 shadow-[0_0_60px_rgba(30,144,255,0.18)]"
        />
      </motion.div>
    </div>
  );
};

export default AboutMe;
