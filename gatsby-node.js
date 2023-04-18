/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

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
