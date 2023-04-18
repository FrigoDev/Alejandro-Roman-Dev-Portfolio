import {Link} from "gatsby";
import React from "react";
import {FaLinkedin} from "react-icons/fa";
import {MdEmail} from "react-icons/md";

import "./Footer.css";

const Footer = () => {
  return (
    <div className="flex flex-wrap justify-around items-center bg-footer text-white gap-4 p-6">
      <div className="flex duration-150 hover:text-blue-500 cursor-pointer">Find me on LinkedIn<Link className="ml-2" to="https://www.linkedin.com/in/alejandro-ramirez-0b0b1b1b9/"><FaLinkedin className="text-2xl" /></Link></div>
      <div>© 2023 - Alejandro Román Misas</div>
      <div className="flex duration-150 hover:text-blue-500 cursor-pointer">Send me an Email <Link className="ml-2" to="mailto:alejo012903@gmail.com"><MdEmail className="text-2xl" /></Link></div>
    </div>
  );
};
export default Footer;