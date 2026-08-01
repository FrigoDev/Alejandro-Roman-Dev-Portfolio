/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  });
};

// Explicit schema customization: the `videoFile` field on Projects is
// optional and no entry has a value yet, so gatsby-source-contentful's
// schema inference skips it. We declare it here so the GraphQL query in
// src/pages/index.tsx and the createPages query below can resolve it.
module.exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type ContentfulProjects implements Node {
      videoFile: ContentfulAsset @link(by: "id", from: "videoFile___NODE")
    }
  `);
};

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const projectTemplate = path.resolve(
    "./src/components/ProjectsDetails/index.tsx"
  );
  const { data } = await graphql(`
    query Home {
      allContentfulProjects {
        edges {
          node {
            id
            name
            link
            tags
            contentful_id
            description {
              description
            }
            videoFile {
              url
              file {
                url
                contentType
                fileName
              }
            }
          }
        }
      }
    }
  `);
  data.allContentfulProjects.edges.forEach((edge) => {
    createPage({
      component: projectTemplate,
      path: `/project/${edge.node.id}`,
      context: {
        id: edge.node.id,
      },
    });
  });
};
