import { graphql } from "gatsby";
import React from "react";

import AnimatedHome from "../components/AnimatedHome";
import Footer from "../components/Footer";
import ProgressBar from "../components/ProgressBar";
import ProjectsSection from "../components/ProjectsSection";
import SEO from "../components/SEO";
import Skills from "../components/SkillsSection";
import SectionLayout from "../template/SectionLayout";
import { HomeProps } from "../types/home";

const Home = ({ data }: HomeProps) => {
  return (
    <main>
      <SEO title="Alejandro Román - Frontend Developer" description="I am a dedicated frontend developer and systems engineering student at Universidad De Cartagena. Explore my portfolio to see my work!" />
      <ProgressBar />
      <AnimatedHome />
      <SectionLayout name="Skills & Technologies" type="">
        <Skills data={data.allContentfulTechnologies.edges} />
      </SectionLayout>

      <SectionLayout name="Projects" type="dark">
        <ProjectsSection projectsData={data.allContentfulProjects} />
      </SectionLayout>
      <Footer />
    </main>
  );
};

export const query = graphql`
  query Home {
    allContentfulProjects {
      edges {
        node {
          id
          name
          link
          tags
          contentful_id
          image {
            gatsbyImageData(placeholder: BLURRED)
          }
          description {
            description
          }
        }
      }
    }
    allContentfulTechnologies {
      edges {
        node {
          name
          image {
            gatsbyImageData(placeholder: BLURRED)
          }
        }
      }
    }
  }
`;

export default Home;
