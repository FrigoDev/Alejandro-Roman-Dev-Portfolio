import React, { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FiArrowUp } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import { SiGatsby, SiReact, SiTailwindcss, SiTypescript } from "react-icons/si";

import { NAV_LINKS } from "../Navbar";

const EMAIL = "alejo012903@gmail.com";

const FOCUS_RING =
  "rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400";

const Kbd = ({ children }: { children: React.ReactNode }) => (
  <kbd className="rounded border border-slate-300 bg-white px-1.5 py-0.5 font-sans text-[11px] font-medium text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300">
    {children}
  </kbd>
);

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/FrigoDev", icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/frigodev/", icon: FaLinkedin },
  { label: "Twitter", href: "https://twitter.com/FrigoDev", icon: FaTwitter },
  { label: "Email", href: `mailto:${EMAIL}`, icon: MdEmail },
];

const Footer = () => {
  const [modKey, setModKey] = useState("Ctrl");

  useEffect(() => {
    if (/Mac|iPhone|iPad/i.test(window.navigator.platform || window.navigator.userAgent)) {
      setModKey("⌘");
    }
  }, []);

  return (
    <footer className="bg-slate-50 text-slate-700 dark:bg-slate-900 dark:text-slate-300">
      <div
        className="h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
        aria-hidden
      />

      <div className="container mx-auto grid gap-10 px-6 py-12 md:grid-cols-3">
        <div>
          <p className="text-xl font-extrabold text-slate-900 dark:text-white">
            FrigoDev<span className="text-blue-500">.</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Full-Stack Developer building something new every day.
          </p>
          <div className="mt-5 flex items-center gap-4 text-xl">
            {SOCIALS.map((social) => {
              const Icon = social.icon;
              const isExternal = social.href.startsWith("http");
              return (
                <a
                  key={social.label}
                  href={social.href}
                  {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
                  aria-label={social.label}
                  className={`text-slate-500 transition-colors hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400 ${FOCUS_RING}`}
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>

        <nav aria-label="Footer">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Navigate</h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`group inline-flex items-center gap-1.5 transition-colors hover:text-blue-500 dark:hover:text-blue-400 ${FOCUS_RING}`}
                >
                  <span
                    className="-translate-x-1 text-blue-500 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                    aria-hidden
                  >
                    →
                  </span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Get in touch
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li className="flex flex-wrap items-center gap-1.5 text-slate-600 dark:text-slate-400">
              Press <Kbd>{modKey}</Kbd>
              <Kbd>K</Kbd> for quick contact
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-700/60">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-slate-500 dark:text-slate-400 sm:flex-row">
          <p>© 2026 Alejandro Román. All rights reserved.</p>
          <p className="flex items-center gap-2.5">
            Built with
            <span className="flex items-center gap-2.5 text-base text-slate-600 dark:text-slate-400">
              <SiGatsby title="Gatsby" className="transition-colors hover:text-[#663399]" />
              <SiReact title="React" className="transition-colors hover:text-[#61dafb]" />
              <SiTypescript title="TypeScript" className="transition-colors hover:text-[#3178c6]" />
              <SiTailwindcss title="Tailwind CSS" className="transition-colors hover:text-[#38bdf8]" />
            </span>
          </p>
          <a
            href="#Home"
            className={`inline-flex items-center gap-1.5 font-semibold text-slate-600 transition-colors hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400 ${FOCUS_RING}`}
          >
            Back to top
            <FiArrowUp aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
