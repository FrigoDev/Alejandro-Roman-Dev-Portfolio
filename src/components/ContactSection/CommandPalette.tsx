import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { IconType } from "react-icons";
import { FiCheck, FiCornerDownLeft, FiSearch } from "react-icons/fi";

export interface PaletteCommand {
  id: string;
  label: string;
  detail: string;
  keywords: string;
  icon: IconType;
  run: () => void | Promise<void>;
  /** Keep the palette open this long after running, to show feedback */
  keepOpenMs?: number;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  commands: PaletteCommand[];
  modKey: string;
}

const Kbd = ({ children }: { children: React.ReactNode }) => (
  <kbd className="rounded border border-slate-600 bg-slate-800 px-1.5 py-0.5 font-sans text-[11px] font-medium text-slate-300">
    {children}
  </kbd>
);

const CommandPalette = ({ open, onClose, commands, modKey }: CommandPaletteProps) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [executedId, setExecutedId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const text = query.trim().toLowerCase();
    if (!text) return commands;
    return commands.filter((command) =>
      `${command.label} ${command.detail} ${command.keywords}`.toLowerCase().includes(text)
    );
  }, [commands, query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setExecutedId(null);
      window.setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keep the page from scrolling behind the palette
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const execute = async (command: PaletteCommand) => {
    await command.run();
    if (command.keepOpenMs) {
      setExecutedId(command.id);
      window.setTimeout(onClose, command.keepOpenMs);
    } else {
      onClose();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const count = Math.max(filtered.length, 1);
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((index) => (index + 1) % count);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((index) => (index - 1 + count) % count);
    } else if (event.key === "Enter" && filtered[selectedIndex]) {
      event.preventDefault();
      execute(filtered[selectedIndex]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[16vh]"
          onKeyDown={handleKeyDown}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Quick contact palette"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-900 shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-slate-700/70 px-4">
              <FiSearch className="shrink-0 text-slate-500" aria-hidden />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Type a command…"
                className="w-full bg-transparent py-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
                role="combobox"
                aria-expanded="true"
                aria-controls="contact-palette-list"
                aria-activedescendant={
                  filtered[selectedIndex] ? `palette-item-${filtered[selectedIndex].id}` : undefined
                }
              />
              <Kbd>esc</Kbd>
            </div>

            <ul
              id="contact-palette-list"
              role="listbox"
              className="themed-scrollbar max-h-72 overflow-y-auto p-2"
            >
              <li
                role="presentation"
                className="px-3 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-widest text-slate-500"
              >
                Contact
              </li>
              {filtered.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-slate-500">
                  No matching commands
                </li>
              )}
              {filtered.map((command, index) => {
                const Icon = command.icon;
                const isSelected = index === selectedIndex;
                const wasExecuted = executedId === command.id;
                return (
                  <li
                    key={command.id}
                    id={`palette-item-${command.id}`}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <button
                      type="button"
                      onClick={() => execute(command)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                        isSelected ? "bg-blue-500/15 text-blue-300" : "text-slate-300"
                      }`}
                    >
                      <Icon className="shrink-0 text-lg" aria-hidden />
                      <span className="flex-1">
                        <span className="block font-medium">
                          {wasExecuted ? "Copied to clipboard!" : command.label}
                        </span>
                        <span className="block text-xs text-slate-500">{command.detail}</span>
                      </span>
                      {wasExecuted ? (
                        <FiCheck className="shrink-0 text-emerald-400" aria-hidden />
                      ) : (
                        isSelected && <FiCornerDownLeft className="shrink-0 text-slate-500" aria-hidden />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-4 border-t border-slate-700/70 px-4 py-2.5 text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5">
                <Kbd>↑↓</Kbd> navigate
              </span>
              <span className="flex items-center gap-1.5">
                <Kbd>↵</Kbd> run
              </span>
              <span className="flex items-center gap-1.5">
                <Kbd>esc</Kbd> close
              </span>
              <span className="ml-auto flex items-center gap-1.5">
                <Kbd>{modKey}</Kbd>
                <Kbd>K</Kbd> anywhere
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
