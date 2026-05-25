import { motion } from "framer-motion";
import React from "react";
import { IoMdClose } from "react-icons/io";

export default function TagFilter({
  name,
  handleDelete,
}: {
  name: string;
  handleDelete: () => void;
}) {
  return (
    <motion.button
      type="button"
      layout
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.2 }}
      onClick={handleDelete}
      className="group inline-flex items-center gap-1.5 rounded-full border border-blue-400 bg-blue-500 px-3 py-1.5 text-sm font-medium text-white shadow-md shadow-blue-200 transition-colors hover:border-red-400 hover:bg-red-500 hover:shadow-red-200"
      aria-label={`Remove filter ${name}`}
    >
      <span>{name}</span>
      <IoMdClose className="text-base opacity-70 transition-opacity group-hover:opacity-100" />
    </motion.button>
  );
}
