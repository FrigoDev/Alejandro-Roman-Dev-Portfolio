import { IGatsbyImageData } from "gatsby-plugin-image";

export interface HomeProps {
  data: HomeData;
}
export interface HomeData {
  allContentfulProjects: AllContentfulProjects;
  allContentfulTechnologies: AllContentfulTechnologies;
  allContentfulExperience?: AllContentfulExperience;
}

export interface AllContentfulProjects {
  edges: AllContentfulProjectsEdge[];
}

export interface AllContentfulProjectsEdge {
  node: PurpleNode;
}

export interface PurpleNode {
  id: string;
  name: string;
  link: string;
  tags: string[];
  contentful_id: string;
  description: Description;
  image: Image;
}

export interface Description {
  description: string;
}

export interface AllContentfulTechnologies {
  edges: AllContentfulTechnologiesEdge[];
}

export interface AllContentfulTechnologiesEdge {
  node: FluffyNode;
}

export interface FluffyNode {
  name: string;
  image: Image;
}

export interface Image {
  gatsbyImageData: IGatsbyImageData;
}

export interface Fallback {
  src: string;
  srcSet: string;
  sizes: string;
}

export interface Source {
  srcSet: string;
  sizes: string;
  type: string;
}

export interface AllContentfulExperience {
  edges: AllContentfulExperienceEdge[];
}

export interface AllContentfulExperienceEdge {
  node: ExperienceNode;
}

export interface ExperienceNode {
  id: string;
  companyName: string;
  position: string;
  startDate: string;
  endDate: string | null;
  description: Description;
  companyLogo: Image | null;
  technologies: string[];
  location: string;
}
