import { motion } from "framer-motion";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaFileAlt, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FiCopy } from "react-icons/fi";
import { MdEmail } from "react-icons/md";

import { showAnimation } from "../../utils/animations";
import CommandPalette, { PaletteCommand } from "./CommandPalette";

const EMAIL = "alejo012903@gmail.com";
const LINKS = {
  linkedin: "https://www.linkedin.com/in/frigodev/",
  github: "https://github.com/FrigoDev",
  twitter: "https://twitter.com/FrigoDev",
  cv: "/CV Alejandro Román v2 Eng Version.pdf",
};

const CONTACT_LINES = [
  { label: "email", value: EMAIL, href: `mailto:${EMAIL}`, external: false },
  { label: "linkedin", value: "/in/frigodev", href: LINKS.linkedin, external: true },
  { label: "github", value: "@FrigoDev", href: LINKS.github, external: true },
  { label: "twitter", value: "@FrigoDev", href: LINKS.twitter, external: true },
  { label: "cv", value: "alejandro-roman.pdf", href: LINKS.cv, external: true },
];

const Kbd = ({ children }: { children: React.ReactNode }) => (
  <kbd className="rounded border border-slate-600 bg-slate-800 px-1.5 py-0.5 font-sans text-[11px] font-medium text-slate-300">
    {children}
  </kbd>
);

const ContactSection = () => {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [modKey, setModKey] = useState("Ctrl");
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (/Mac|iPhone|iPad/i.test(window.navigator.platform || window.navigator.userAgent)) {
      setModKey("⌘");
    }
  }, []);

  // Global shortcut: Ctrl/⌘ + K toggles the palette from anywhere on the page
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const closePalette = useCallback(() => {
    setPaletteOpen(false);
    triggerRef.current?.focus();
  }, []);

  const commands = useMemo<PaletteCommand[]>(
    () => [
      {
        id: "email",
        label: "Send an email",
        detail: EMAIL,
        keywords: "mail gmail say hello message",
        icon: MdEmail,
        run: () => {
          window.location.href = `mailto:${EMAIL}`;
        },
      },
      {
        id: "copy-email",
        label: "Copy email address",
        detail: "Copies it to your clipboard",
        keywords: "clipboard mail copy",
        icon: FiCopy,
        keepOpenMs: 900,
        run: async () => {
          try {
            await navigator.clipboard.writeText(EMAIL);
          } catch {
            window.location.href = `mailto:${EMAIL}`;
          }
        },
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        detail: "/in/frigodev",
        keywords: "connect network job",
        icon: FaLinkedin,
        run: () => {
          window.open(LINKS.linkedin, "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "github",
        label: "Open GitHub",
        detail: "@FrigoDev",
        keywords: "code repositories projects",
        icon: FaGithub,
        run: () => {
          window.open(LINKS.github, "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "twitter",
        label: "Open Twitter",
        detail: "@FrigoDev",
        keywords: "x social tweet",
        icon: FaTwitter,
        run: () => {
          window.open(LINKS.twitter, "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "cv",
        label: "Download CV",
        detail: "PDF · English",
        keywords: "resume curriculum vitae pdf",
        icon: FaFileAlt,
        run: () => {
          window.open(LINKS.cv, "_blank", "noopener,noreferrer");
        },
      },
    ],
    []
  );

  return (
    <motion.div
      viewport={{ once: true, amount: 0.4 }}
      initial="offscreen"
      whileInView="onscreen"
      variants={showAnimation}
      className="mx-auto w-full max-w-2xl px-4 pb-8"
    >
      <div className="overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900 text-left shadow-xl">
        <div className="flex items-center gap-1.5 border-b border-slate-700/60 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-500/80" aria-hidden />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" aria-hidden />
          <span className="h-3 w-3 rounded-full bg-emerald-500/80" aria-hidden />
          <span className="ml-3 font-mono text-xs font-medium text-slate-400">
            frigodev@portfolio: ~/contact
          </span>
        </div>

        <div className="p-5 font-mono text-sm leading-7 sm:p-6">
          <p>
            <span className="text-emerald-400">$</span> <span className="text-slate-100">whoami</span>
          </p>
          <p className="text-slate-400">
            alejandro-roman · full-stack developer · open to new opportunities
          </p>

          <p className="mt-4">
            <span className="text-emerald-400">$</span>{" "}
            <span className="text-slate-100">contact --list</span>
          </p>
          <ul>
            {CONTACT_LINES.map((line) => (
              <li key={line.label}>
                <a
                  href={line.href}
                  {...(line.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="group flex items-baseline gap-3 rounded px-1 text-slate-300 transition-colors hover:text-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                >
                  <span className="text-slate-600 group-hover:text-blue-400/60">→</span>
                  <span className="w-20 shrink-0 text-slate-500 group-hover:text-blue-400/80">
                    {line.label}
                  </span>
                  <span className="truncate">{line.value}</span>
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-emerald-400">$</span>
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="rounded text-blue-400 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              contact --quick
            </button>
            <span className="inline-flex items-center gap-1.5 text-slate-500">
              # or press <Kbd>{modKey}</Kbd>
              <Kbd>K</Kbd>
            </span>
            <motion.span
              className="inline-block h-4 w-2 bg-slate-300/90 align-middle"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
              aria-hidden
            />
          </p>
        </div>
      </div>

      <CommandPalette
        open={paletteOpen}
        onClose={closePalette}
        commands={commands}
        modKey={modKey}
      />
    </motion.div>
  );
};

export default ContactSection;
