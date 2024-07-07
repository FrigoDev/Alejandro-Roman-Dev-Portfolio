// src/components/SEO.tsx
import React from "react";
import { Helmet } from "react-helmet";

import favicon from "../../images/favicon.ico";


interface SEOProps {
  title: string;
  description: string;
}

const SEO: React.FC<SEOProps> = ({ title, description }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content="Portfolio, FrigoDev, Alejandro Roman, Frontend Developer, frontend developer, systems engineering student, Universidad De Cartagena, React, Next.js, AstroJS, web development, web applications" />
    <meta name="author" content="FrigoDev" />
    <link rel="icon" 
      type="image/png"
      href={favicon}>
    </link>
  </Helmet>
);

export default SEO;