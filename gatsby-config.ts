import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
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
        "name": "images",
        "path": "./src/images"
      },
    },
    {
      resolve: "gatsby-source-contentful",
      options: {
        "spaceId": "vm0g6j1fpd9z",
        "accessToken": "yrXWdk4DxtB1gKGVEPDrdvUdYBNSOU3slcAcA0hpBQk"
      }
    },
  ],
};

export default config;
