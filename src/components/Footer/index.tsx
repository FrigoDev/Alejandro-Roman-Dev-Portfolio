import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import "./Footer.css";

const Footer = () => {
  return (
    <div className="flex flex-wrap justify-around items-center bg-footer text-white gap-4 p-6">
      <a href="https://www.linkedin.com/in/frigodev/" target="_blank" rel="noreferrer">
        <div className="flex duration-150 hover:text-blue-500 cursor-pointer">
          Find me on LinkedIn
          <FaLinkedin className="ml-2 text-2xl" />
        </div>
      </a>
      <div>© 2023 - Alejandro Román Misas</div>
      <a href="mailto:alejo012903@gmail.com">
        <div className="flex duration-150 hover:text-blue-500 cursor-pointer">
          Send me an Email <MdEmail className="ml-2 text-2xl" />
        </div>
      </a>
    </div>
  );
};
export default Footer;
