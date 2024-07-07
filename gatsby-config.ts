import * as dotenv from "dotenv";
import type { GatsbyConfig } from "gatsby";

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const config: GatsbyConfig = {
  siteMetadata: {
    title: "Alejandro Román - Frontend Developer",
    description: "Alejandro Román - Frontend Developer Portfolio built with Gatsby and Contentful",
    author: "FrigoDev",
  },
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-json",
    "gatsby-plugin-postcss",
    "gatsby-plugin-typescript",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images",
      },
    },
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: process.env.SPACEID,
        accessToken: process.env.ACCESSTOKEN,
      },
    }
  ],
};

export default config;
