import { IGatsbyImageData } from "gatsby-plugin-image";

export interface DetailedProjectsProps {
  data: Data;
}

export interface Data {
  allContentfulProjects: AllContentfulProjects;
}

export interface AllContentfulProjects {
  edges: Edge[];
}

export interface Edge {
  node: Node;
}

export interface Node {
  name: string;
  image: Image;
  tags: string[];
  description: Description;
}

export interface Description {
  description: string;
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
