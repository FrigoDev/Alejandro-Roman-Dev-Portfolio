import React from "react";
import { AiFillTag } from "react-icons/ai";
import { IoMdCloseCircle } from "react-icons/io";
export default function TagFilter({
  name,
  handleDelete,
}: {
  name: string;
  handleDelete: () => void;
}) {
  return (
    <div
      onClick={handleDelete}
      className="px-3 my-1 ml-2 rounded-lg flex items-center justify-center font-semibold bg-blue-500 text-white hover:bg-red-500 hover:pointer-events-auto"
    >
      <AiFillTag />
      <div className="mx-1 p-1 pointer-events-none">{name + " "}</div>
      <IoMdCloseCircle />
    </div>
  );
}
