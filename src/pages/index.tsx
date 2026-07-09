import { graphql } from "gatsby";
import React from "react";

import AboutMe from "../components/AboutMe";
import AnimatedHome from "../components/AnimatedHome";
import ExperienceSection from "../components/ExperienceSection";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProgressBar from "../components/ProgressBar";
import ProjectsSection from "../components/ProjectsSection";
import SEO from "../components/SEO";
import Skills from "../components/SkillsSection";
import SectionLayout from "../template/SectionLayout";
import { HomeProps } from "../types/home";

const Home = ({ data }: HomeProps) => {
  return (
    <>
      <SEO title="Alejandro Román - Frontend Developer" description="I am a dedicated frontend developer and Systems Engineer from Universidad De Cartagena. Explore my portfolio to see my work!" />
      <ProgressBar />
      <Navbar />
      <main>
        <AnimatedHome />
        <SectionLayout name="About Me" type="">
          <AboutMe />
        </SectionLayout>
        <SectionLayout name="Skills & Technologies" type="">
          <Skills data={data.allContentfulTechnologies.edges} />
        </SectionLayout>

        <SectionLayout name="Experience" type="dark">
          <ExperienceSection experiences={data.allContentfulExperience?.edges || []} />
        </SectionLayout>

        <SectionLayout name="Projects" type="">
          <ProjectsSection projectsData={data.allContentfulProjects} />
        </SectionLayout>
      </main>
      <Footer />
    </>
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
          category
          image {
            gatsbyImageData(placeholder: BLURRED)
          }
        }
      }
    }
    allContentfulExperience(sort: { startDate: DESC }) {
      edges {
        node {
          id
          companyName
          position
          startDate
          endDate
          location
          technologies
          description {
            description
          }
          companyLogo {
            gatsbyImageData(placeholder: BLURRED)
          }
        }
      }
    }
  }
`;

export default Home;
