import { motion } from "framer-motion";
import { graphql, Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import * as React from "react";
import { BiArrowBack } from "react-icons/bi";

import "./ProjectsDetails.css";
import { DetailedProjectsProps } from "../../types/detailedProjects";
import Footer from "../Footer";
import SEO from "../SEO";

export const query = graphql`
  query MyQuery($id: String!) {
    allContentfulProjects(filter: { id: { eq: $id } }) {
      edges {
        node {
          link
          name
          image {
            gatsbyImageData(placeholder: BLURRED)
          }
          tags
          description {
            description
          }
        }
      }
    }
  }
`;

const ProjectDetails = ({ data }: DetailedProjectsProps) => {
  const project = data.allContentfulProjects.edges[0].node;
  return (
    <>
      <main className="min-h-screen p-8 bg-main-color">
        <SEO title="Alejandro Román - Frontend Developer" description="I am a dedicated frontend developer and systems engineering student at Universidad De Cartagena. Explore my portfolio to see my work!" />
        <div className="container mx-auto">
          <div className="py-14">
            <h1 className="text-white text-center uppercase font-bold text-4xl tracking-wide">
              {project.name}
            </h1>
          </div>
          <motion.div
            className=" top-0 left-0 mb-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {
                opacity: 0,
                x: -100,
              },
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  delay: 0.5,
                },
              },
            }}
          >
            <Link to="/" className="inline-flex items-center hover:scale-125">
              <BiArrowBack className="text-2xl text-white" />
              <p className="text-white font-bold">Go Back</p>
            </Link>
          </motion.div>
          <div className="mx-2">
            <p className="mb-5 font-medium text-white text-xl">
              {project.description.description}
            </p>
          </div>
          <div className="flex justify-center">
            <GatsbyImage
              className="w-6/6 sm:w-4/6"
              image={project.image.gatsbyImageData}
              alt={project.name}
            />
          </div>
          <div className="flex justify-center pb-6">
            <p className="font-bold text-lg text-white">
              {"Technologies: " + project.tags.join(", ")}
            </p>
          </div>
          <div className="flex justify-center">
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="bg-white text-black hover:text-white hover:bg-black hover:drop-shadow-xl shadow-white font-bold py-2 px-4 rounded-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              View Project
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProjectDetails;
