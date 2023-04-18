import { motion } from "framer-motion";
import { graphql, Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import * as React from "react";
import { BiArrowBack } from "react-icons/bi";

import "./ProjectsDetails.css";
import { DetailedProjectsProps } from "../../types/detailedProjects";
import Footer from "../Footer";

export const query = graphql`
  query MyQuery($id: String!) {
    allContentfulProjects(filter: { id: { eq: $id } }) {
      edges {
        node {
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
      <main className="h-screen p-8 bg-main-color">
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
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProjectDetails;
