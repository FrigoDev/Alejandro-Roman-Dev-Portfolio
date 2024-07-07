import { Link, PageProps } from "gatsby";
import * as React from "react";

import "../components/ProjectsDetails/ProjectsDetails.css";
import SEO from "../components/SEO";

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <main className="h-screen bg-main-color flex flex-col justify-center ">
      <SEO title="Alejandro Román - Frontend Developer" description="I am a dedicated frontend developer and systems engineering student at Universidad De Cartagena. Explore my portfolio to see my work!" />
      <h1 className="text-white text-center uppercase font-bold text-4xl tracking-wide mb-6">
        Page not found
      </h1>
      <p className="text-white text-center mb-5 font-medium text-xl">
        Sorry 😭😭😭😭, we couldn’t find what you were looking for.
        <br />
        <Link className="mt-4" to="/">
          {<br />}Go home
        </Link>
        .
      </p>
    </main>
  );
};

export default NotFoundPage;
