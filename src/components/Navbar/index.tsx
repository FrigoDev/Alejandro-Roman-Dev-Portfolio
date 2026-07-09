import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import { FiMoon, FiSun } from "react-icons/fi";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

const NAV_LINKS = [
  { id: "Home", label: "Home" },
  { id: "about-me", label: "About Me" },
  { id: "skills-technologies", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
];

const NAVBAR_HEIGHT = 96;

// top: resting at scroll 0, fully merged with the hero background.
// hero: scrolling within the hero — a subtle veil so hero text sliding
//       underneath doesn't clash with the nav links.
// solid: past the hero — full contrast bar over the light sections.
type NavPhase = "top" | "hero" | "solid";

const HEADER_STYLES: Record<NavPhase, string> = {
  top: "border-b border-transparent bg-transparent",
  hero: "border-b border-transparent bg-black/40 backdrop-blur-sm",
  solid: "border-b border-white/10 bg-black/80 shadow-lg shadow-black/20 backdrop-blur-md",
};

const Navbar = () => {
  const [phase, setPhase] = useState<NavPhase>("top");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("Home");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Read the theme applied before hydration (see gatsby-ssr.js)
  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  };

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y <= 16) setPhase("top");
      else if (y <= window.innerHeight - NAVBAR_HEIGHT) setPhase("hero");
      else setPhase("solid");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.getElementById(link.id)).filter(
      (section): section is HTMLElement => section !== null
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const linkClass = (id: string) =>
    `rounded-md px-3 py-2 text-sm font-semibold transition-colors duration-200 ${
      activeId === id ? "text-blue-400" : "text-white/80 hover:text-white"
    }`;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-30 transition-all duration-300 ${HEADER_STYLES[phase]}`}
    >
      <nav
        aria-label="Main navigation"
        className={`mx-auto flex max-w-6xl items-center justify-between px-4 transition-all duration-300 sm:px-6 ${
          phase === "solid" ? "h-16" : "h-20"
        }`}
      >
        <a href="#Home" className="text-xl font-extrabold text-white">
          FrigoDev<span className="text-blue-500">.</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={linkClass(link.id)}
              aria-current={activeId === link.id ? "true" : undefined}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/CV Alejandro Román v2 Eng Version.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-1.5 text-sm font-semibold text-white transition hover:border-blue-400/80 hover:bg-white/10"
          >
            <FaFileAlt aria-hidden />
            CV
          </a>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-blue-400/80 hover:bg-white/10"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <FiSun aria-hidden /> : <FiMoon aria-hidden />}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="text-2xl text-white md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <IoMdClose /> : <HiMenuAlt3 />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="border-t border-white/10 bg-black/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col px-4 py-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-md px-3 py-3 font-semibold transition-colors ${
                    activeId === link.id ? "text-blue-400" : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/CV Alejandro Román v2 Eng Version.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="mt-2 inline-flex items-center gap-2 rounded-md px-3 py-3 font-semibold text-white/80 transition-colors hover:text-white"
              >
                <FaFileAlt aria-hidden />
                Download CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
