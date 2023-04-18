import { Link, HeadFC, PageProps } from "gatsby";
import * as React from "react";

import "../components/ProjectsDetails/ProjectsDetails.css";

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <main className="h-screen bg-main-color flex flex-col justify-center ">
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

export const Head: HeadFC = () => <title>Page Not found</title>;
